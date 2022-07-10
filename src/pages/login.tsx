import { useState } from "react";
import useAuth from "hooks/useAuth";
import Label from "components/Label";
import Input from "components/Input";
import AuthCard from "components/AuthCard";
import GuestLayout from "layouts/GuestLayout";
import ApplicationLogo from "components/ApplicationLogo";
import LoadingButton from "components/LoadingButton";
import ShowAlert from "components/ShowAlert";
import ShowError from "components/ShowError";
import NextLink from "components/NextLink";
import checkAuth from "auth/CheckAuth";
import { useRouter } from "next/router";

const Login = () => {
  const router = useRouter();
  const { login, errors, message, isLoading } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange =
    (prop: any) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setFormData({ ...formData, [prop]: event.target.value });
    };

  const submitForm = (event: React.SyntheticEvent) => {
    event.preventDefault();
    login(formData);
  };

  return (
    <AuthCard>
      <div className="flex justify-center mb-2 ">
        <NextLink href="/">
          <ApplicationLogo className="w-20 h-20 fill-current text-gray-500" />
        </NextLink>
      </div>
      <ShowAlert message={message} />

      <form onSubmit={submitForm}>
        {/* Email Address */}
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            className="mt-1"
            onChange={handleChange("email")}
            required
            autoFocus
          />
          <ShowError errors={errors} type="email" />
        </div>
        {/* Password */}
        <div className="mt-4">
          <Label htmlFor="password">Password</Label>
          <Input
            required
            id="password"
            type="password"
            className="mt-1"
            value={formData.password}
            onChange={handleChange("password")}
            autoComplete="current-password"
          />
          <ShowError errors={errors} type="password" />
        </div>

        {/* Remember Me */}
        <div className="block mt-4">
          <label htmlFor="remember_me" className="inline-flex items-center">
            <input
              id="remember_me"
              type="checkbox"
              name="remember"
              className="rounded border-gray-300 text-indigo-600
                shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
            <span className="ml-2 text-sm text-gray-600">Remember me</span>
          </label>
        </div>

        <div className="flex items-center justify-between mt-4">
          <NextLink
            href="/forgot-password"
            className="underline text-sm text-gray-600 hover:text-gray-900"
          >
            Forgot your password?
          </NextLink>
          <LoadingButton isLoading={isLoading}>Login</LoadingButton>
        </div>
      </form>
    </AuthCard>
  );
};

Login.Layout = GuestLayout;

export const getServerSideProps = checkAuth(async (context) => {
  return {
    props: {},
  };
});

export default Login;
