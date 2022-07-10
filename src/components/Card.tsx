import { FC, ReactNode } from "react";
import { DivProps } from "react-html-props";

interface Props extends DivProps {
  children: ReactNode;
  className?: string;
}

const Card: FC<Props> = ({ className, children, ...props }) => (
  <div
    className={`
      w-full sm:max-w-md mt-6 px-6 py-4 bg-white shadow-md 
      overflow-hidden sm:rounded-lg ${className}
    `}
    {...props}
  >
    {children}
  </div>
);

export default Card;
