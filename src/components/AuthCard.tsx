import { FC, ReactNode } from "react";
import { DivProps } from "react-html-props";
import Card from "./Card";

interface Props extends DivProps {
  children: ReactNode;
  className?: string;
}

const AuthCard: FC<Props> = ({ className, children, ...props }) => (
  <div
    className={`min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-100 ${className}`}
    {...props}
  >
    <Card>{children}</Card>
  </div>
);

export default AuthCard;
