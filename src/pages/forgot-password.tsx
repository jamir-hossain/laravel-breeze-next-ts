import { useState } from "react";
import useAuth from "hooks/useAuth";
import Label from "components/Label";
import Input from "components/Input";
import AuthCard from "components/AuthCard";
import GuestLayout from "layouts/GuestLayout";
import ShowError from "components/ShowError";
import LoadingButton from "components/LoadingButton";
import ApplicationLogo from "components/ApplicationLogo";
import ShowAlert from "components/ShowAlert";
import NextLink from "components/NextLink";
import checkAuth from "auth/CheckAuth";

const ForgotPassword = () => {
  const { forgotPassword, errors, message, isLoading } = useAuth();

  const [email, setEmail] = useState("");
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const submitForm = (event: React.SyntheticEvent) => {
    event.preventDefault();
    forgotPassword(email);
  };

  return (
    <GuestLayout>
      <AuthCard>
        <div className="flex justify-center mb-2 ">
          <NextLink href="/">
            <ApplicationLogo className="w-20 h-20 fill-current text-gray-500" />
          </NextLink>
        </div>
        <ShowAlert message={message} />

        <div className="mb-4 text-sm text-gray-600">
          Forgot your password? No problem. Just let us know your email address
          and we will email you a password reset link that will allow you to
          choose a new one.
        </div>

        <form onSubmit={submitForm}>
          {/* Email Address */}
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              required
              autoFocus
              id="email"
              type="email"
              name="email"
              value={email}
              className="mt-1"
              onChange={handleChange}
            />
            <ShowError errors={errors} type="email" />
          </div>
          <div className="flex items-center justify-between mt-4">
            <NextLink
              href="/login"
              className="underline text-sm text-gray-600 hover:text-gray-900"
            >
              Go back login
            </NextLink>
            <LoadingButton type="submit" isLoading={isLoading}>
              Email Password Reset Link
            </LoadingButton>
          </div>
        </form>
      </AuthCard>
    </GuestLayout>
  );
};

ForgotPassword.Layout = GuestLayout;

export const getServerSideProps = checkAuth(async (context) => {
  return {
    props: {},
  };
});

export default ForgotPassword;
