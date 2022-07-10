import { FC } from "react";
import { InputProps } from "react-html-props";

interface Props extends InputProps {
  className?: string;
}

const Input: FC<Props> = ({ className, ...props }) => (
  <input
    className={`
      rounded-md shadow-sm bg-gray-100 px-2 border-gray-300 focus:border-indigo-300
      w-full h-8 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 ${className}
    `}
    {...props}
  />
);

export default Input;
