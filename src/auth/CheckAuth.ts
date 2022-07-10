import { GetServerSideProps, GetServerSidePropsContext } from "next";

// eslint-disable-next-line
export default function checkAuth(gssp: GetServerSideProps) {
  return async (context: GetServerSidePropsContext) => {
    const { req, res } = context;
    const accessUser = req.cookies.accessUser;
    const accessToken = req.cookies.accessToken;

    if (accessUser || accessToken) {
      // Redirect to login page
      return {
        redirect: {
          destination: "/404",
          statusCode: 302,
        },
      };
    }

    return await gssp(context); // Continue on to call `getServerSideProps` logic
  };
}
