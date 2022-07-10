import React, {
  FC,
  useState,
  useEffect,
  useReducer,
  createContext,
} from "react";
import axios from "utils/axios";
import getErrors from "utils/get-errors";
import { useRouter } from "next/router";
import cookie from "js-cookie";

// ----------------------------------------------------------------------
type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};

type AuthUser = null | Record<string, any>;

type AuthState = {
  isAuthenticated: boolean;
  isInitialized: boolean;
  user: AuthUser;
};

type AuthContextType = {
  isAuthenticated: boolean;
  isInitialized: boolean;
  user: AuthUser;
  login: (data: { email: string; password: string }) => Promise<void>;
  register: (data: {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
  }) => Promise<void>;
  logout: () => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  passwordReset: (data: {
    token: any;
    email: string;
    password: string;
    password_confirmation: string;
  }) => Promise<void>;
  verifyEmailResend: () => Promise<void>;
  verifyEmail: (token: string) => Promise<void>;
  message: { type: "error" | "success"; message: string } | null;
  errors: any[];
  isLoading: boolean;
};
// ----------------------------------------------------------------------

enum Types {
  Initial = "INITIALIZE",
  Login = "LOGIN",
  Logout = "LOGOUT",
  Register = "REGISTER",
  EmailVerify = "EMAIL_VERIFY",
}

type JWTAuthPayload = {
  [Types.Initial]: {
    isAuthenticated: boolean;
    user: AuthUser;
  };
  [Types.Login]: {
    user: AuthUser;
  };
  [Types.Logout]: undefined;
  [Types.EmailVerify]: {
    user: AuthUser;
  };
};

type AuthActions = ActionMap<JWTAuthPayload>[keyof ActionMap<JWTAuthPayload>];

const initialState: AuthState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
};

const AuthReducer = (state: AuthState, action: AuthActions) => {
  switch (action.type) {
    case "INITIALIZE":
      return {
        isAuthenticated: action.payload.isAuthenticated,
        isInitialized: true,
        user: action.payload.user,
      };
    case "LOGIN":
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
      };
    case "LOGOUT":
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    case "EMAIL_VERIFY":
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
      };

    default:
      return state;
  }
};

const AuthContext = createContext<AuthContextType | null>(null);

interface Props {
  children: React.ReactNode;
}
const AuthContextProvider: FC<Props> = ({ children }) => {
  const router = useRouter();
  const [errors, setErrors] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [state, dispatch] = useReducer(AuthReducer, initialState);
  const [message, setMessage] = useState<{
    type: "error" | "success";
    message: string;
  } | null>(null);

  if (message) setTimeout(() => setMessage(null), 5000);

  // Checking token expiration
  const isValidToken = (tokenExpTime: string) => {
    if (!tokenExpTime) {
      return false;
    }
    const currentTime = Date.now();
    const expireTime = Date.parse(tokenExpTime);
    if (currentTime > expireTime) {
      return false;
    } else {
      return true;
    }
  };

  const setSession = (
    data: { token: string; token_expire: string; user: any } | null
  ) => {
    if (data) {
      const { token, token_expire, user } = data;
      const accessToken = JSON.stringify({ token, token_expire });

      cookie.set("accessToken", accessToken);
      cookie.set("accessUser", JSON.stringify(user));
      axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    } else {
      cookie.remove("accessToken");
      cookie.remove("accessUser");
      delete axios.defaults.headers.common.Authorization;
    }
  };

  useEffect(() => {
    const initialize = async () => {
      try {
        const token: any = cookie.get("accessToken");
        const accessToken = JSON.parse(token);
        const user: any = cookie.get("accessUser");
        const accessUser = JSON.parse(user);

        if (accessToken && !isValidToken(accessToken.token_expire)) {
          setErrors([]);
          setSession(null);
          dispatch({ type: Types.Logout });
          router.push("/login");
        } else if (accessToken && isValidToken(accessToken.token_expire)) {
          setSession({ ...accessToken, user: accessUser });

          dispatch({
            type: Types.Initial,
            payload: {
              isAuthenticated: true,
              user: accessUser,
            },
          });
        } else {
          dispatch({
            type: Types.Initial,
            payload: {
              isAuthenticated: false,
              user: null,
            },
          });
        }
      } catch (err) {
        dispatch({
          type: Types.Initial,
          payload: {
            isAuthenticated: false,
            user: null,
          },
        });
      }
    };

    initialize();
  }, []);

  const login = async (data: { email: string; password: string }) => {
    setIsLoading(true);
    try {
      const response: any = await axios.post("/api/login", data);
      router.push("/dashboard");
      setSession(response.data);
      dispatch({
        type: Types.Login,
        payload: {
          user: response.data.user,
        },
      });
      setErrors([]);
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      setMessage({ type: "error", ...error.response.data });
      setErrors(getErrors(error));
    }
  };

  const register = async (data: {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
  }) => {
    setIsLoading(true);
    try {
      await axios.post("/api/register", data);
      setErrors([]);
      router.push("/login");
      setIsLoading(false);
    } catch (error) {
      setErrors(getErrors(error));
      setIsLoading(false);
    }
  };

  const forgotPassword = async (email: string) => {
    setIsLoading(true);
    try {
      const res: any = await axios.post("/api/forgot-password", { email });
      setErrors([]);
      setIsLoading(false);
      setMessage({ type: "success", message: res.data.status });
    } catch (error) {
      setErrors(getErrors(error));
      setIsLoading(false);
    }
  };

  const passwordReset = async (data: {
    token: any;
    email: string | string[];
    password: string;
    password_confirmation: string;
  }) => {
    setIsLoading(true);
    try {
      await axios.post("/api/reset-password", data);
      setErrors([]);
      router.push("/login");
      setIsLoading(false);
    } catch (error) {
      setErrors(getErrors(error));
      setIsLoading(false);
    }
  };

  const verifyEmailResend = async () => {
    setIsLoading(true);
    try {
      const res = await axios.post("/api/resend-verify-email");
      setMessage({ type: "success", message: res.data.status });
      setIsLoading(false);
    } catch (error) {
      setMessage({
        type: "error",
        message: "Something was wrong!. Try again.",
      });
      setIsLoading(false);
    }
  };

  const verifyEmail = async (token: string) => {
    setMessage(null);
    try {
      const { data } = await axios.get(`/api/verify-email/${token}`);
      setMessage(null);
      setIsLoading(false);
      dispatch({
        type: Types.Login,
        payload: {
          user: data.user,
        },
      });
      cookie.set("accessUser", JSON.stringify(data.user));
      router.push("/dashboard");
    } catch (error) {
      setMessage({
        type: "error",
        message: "Something was wrong!. Try again.",
      });
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setErrors([]);
    setSession(null);
    dispatch({ type: Types.Logout });
    router.push("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        logout,
        errors,
        message,
        register,
        isLoading,
        verifyEmail,
        passwordReset,
        forgotPassword,
        verifyEmailResend,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthContextProvider };
