import { GetServerSideProps, GetServerSidePropsContext } from "next";

// eslint-disable-next-line
export default function checkVerifyEmail(gssp: GetServerSideProps) {
  return async (context: GetServerSidePropsContext) => {
    const { req, res } = context;
    const accessUser = req.cookies.accessUser;

    if (accessUser) {
      let { email_verified_at } = JSON.parse(accessUser as string);

      if (email_verified_at) {
        // Redirect to login page
        return {
          redirect: {
            destination: "/404",
            statusCode: 302,
          },
        };
      }
    }

    return await gssp(context); // Continue on to call `getServerSideProps` logic
  };
}
