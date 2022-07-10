import { FC } from "react";
import { ButtonProps } from "react-html-props";

interface Props extends ButtonProps {
  children: string;
  className?: string;
}

const Button: FC<Props> = ({ children, className, ...props }) => (
  <button
    className={`
      inline-flex items-center px-4 py-2 bg-gray-800 border 
      border-transparent rounded-md font-semibold text-xs text-white 
      uppercase tracking-widest hover:bg-gray-700 active:bg-gray-900 
      focus:outline-none focus:border-gray-900 focus:ring ring-gray-300 
      disabled:opacity-25 transition ease-in-out duration-150 ${className}
    `}
    {...props}
  >
    {children}
  </button>
);

export default Button;
