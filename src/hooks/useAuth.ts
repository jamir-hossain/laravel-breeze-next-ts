import { useContext } from "react";
import { AuthContext } from "contexts/AuthContext";

// ----------------------------------------------------------------------

const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context)
    throw new Error("useAuth must be use inside AuthContextProvider");

  return context;
};

export default useAuth;
