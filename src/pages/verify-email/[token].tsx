import { FC } from "react";
import useAuth from "hooks/useAuth";
import AuthCard from "components/AuthCard";
import ShowAlert from "components/ShowAlert";
import { useRouter } from "next/router";

const VerifyEmail: FC = () => {
  const { query } = useRouter();
  const { verifyEmail, message } = useAuth();

  if (query.token) {
    verifyEmail(query.token as string);
  }

  return (
    <>
      {message && (
        <AuthCard>
          <ShowAlert message={message} />
        </AuthCard>
      )}
    </>
  );
};

export default VerifyEmail;
