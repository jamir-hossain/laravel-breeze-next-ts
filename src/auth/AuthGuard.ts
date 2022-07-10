import { GetServerSideProps, GetServerSidePropsContext } from "next";

// eslint-disable-next-line
export default function authGuard(gssp: GetServerSideProps) {
  return async (context: GetServerSidePropsContext) => {
    const { req, res } = context;
    const accessUser = req.cookies.accessUser;
    const accessToken = req.cookies.accessToken;

    if (accessToken && accessUser) {
      // const user: any = cookie.get("accessUser");
      let { token_expire } = JSON.parse(accessToken as string);
      let { email_verified_at } = JSON.parse(accessUser as string);

      // Checking token expiration
      const currentTime = Date.now();
      const expireTime = Date.parse(token_expire);
      if (currentTime > expireTime) {
        return {
          redirect: {
            destination: "/login",
            statusCode: 302,
          },
        };
      }

      if (!email_verified_at) {
        return {
          redirect: {
            destination: "/verify-email-resent",
            statusCode: 302,
          },
        };
      }
    }

    if (!accessToken) {
      // Redirect to login page
      return {
        redirect: {
          destination: "/login",
          statusCode: 302,
        },
      };
    }

    return await gssp(context); // Continue on to call `getServerSideProps` logic
  };
}
