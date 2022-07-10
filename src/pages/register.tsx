import { useState } from "react";
import useAuth from "hooks/useAuth";
import Input from "components/Input";
import Label from "components/Label";
import AuthCard from "components/AuthCard";
import GuestLayout from "layouts/GuestLayout";
import ApplicationLogo from "components/ApplicationLogo";
import ShowError from "components/ShowError";
import LoadingButton from "components/LoadingButton";
import NextLink from "components/NextLink";
import checkAuth from "auth/CheckAuth";

const Register = () => {
  const { register, errors, isLoading } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const handleChange =
    (prop: any) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setFormData({ ...formData, [prop]: event.target.value });
    };

  const submitForm = (event: React.SyntheticEvent) => {
    event.preventDefault();
    register(formData);
  };

  return (
    <GuestLayout>
      <AuthCard>
        <div className="flex justify-center mb-2 ">
          <NextLink href="/">
            <ApplicationLogo className="w-20 h-20 fill-current text-gray-500" />
          </NextLink>
        </div>
        <form onSubmit={submitForm}>
          {/* Name */}
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              required
              autoFocus
              id="name"
              type="text"
              className="mt-1"
              value={formData.name}
              onChange={handleChange("name")}
            />
            <ShowError errors={errors} type="name" />
          </div>

          {/* Email Address */}
          <div className="mt-4">
            <Label htmlFor="email">Email</Label>
            <Input
              required
              id="email"
              type="email"
              className="mt-1"
              value={formData.email}
              onChange={handleChange("email")}
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
              autoComplete="new-password"
            />
            <ShowError errors={errors} type="password" />
          </div>

          {/* Confirm Password */}
          <div className="mt-4">
            <Label htmlFor="password_confirmation">Confirm Password</Label>
            <Input
              required
              className="mt-1"
              type="password"
              id="password_confirmation"
              value={formData.password_confirmation}
              onChange={handleChange("password_confirmation")}
            />
            <ShowError errors={errors} type="password_confirmation" />
          </div>

          <div className="flex items-center justify-between mt-4">
            <NextLink
              href="/login"
              className="underline text-sm text-gray-600 hover:text-gray-900"
            >
              Already registered?
            </NextLink>
            <LoadingButton type="submit" isLoading={isLoading}>
              Register
            </LoadingButton>
          </div>
        </form>
      </AuthCard>
    </GuestLayout>
  );
};

Register.Layout = GuestLayout;

export const getServerSideProps = checkAuth(async (context) => {
  return {
    props: {},
  };
});

export default Register;
