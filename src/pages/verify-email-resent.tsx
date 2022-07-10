import useAuth from "hooks/useAuth";
import AppLayout from "layouts/AppLayout";
import ShowAlert from "components/ShowAlert";
import LoadingButton from "components/LoadingButton";
import checkVerifyEmail from "auth/CheckVerifyEmail";

const VerifyEmailResent = () => {
  const { logout, verifyEmailResend, isLoading, message } = useAuth();

  return (
    <div
      style={{ height: "80vh" }}
      className="flex justify-center items-center pt-6 sm:pt-0 bg-gray-100"
    >
      <div className="w-full sm:max-w-md mt-6 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg">
        <ShowAlert message={message} />

        <div className="mb-4 text-sm text-gray-600">
          {`Thanks for signing up! Before getting started, could you verify your
            email address by clicking on the link we just emailed to you? If you
            didn't receive the email, we will gladly send you another.`}
        </div>

        <div className="mt-4 flex items-center justify-between">
          <button
            type="button"
            className="underline text-sm text-gray-600 hover:text-gray-900"
            onClick={logout}
          >
            Logout
          </button>

          <LoadingButton
            isLoading={isLoading}
            onClick={() => verifyEmailResend()}
          >
            Resend Verification Email
          </LoadingButton>
        </div>
      </div>
    </div>
  );
};

VerifyEmailResent.Layout = AppLayout;

export const getServerSideProps = checkVerifyEmail(async (context) => {
  return {
    props: {},
  };
});

export default VerifyEmailResent;
