import { FC } from "react";
import { LabelProps } from "react-html-props";

interface Props extends LabelProps {
  children: string;
  className?: string;
}

const Label: FC<Props> = ({ className, children, ...props }) => (
  <label
    className={`${className} block font-medium text-sm text-gray-700`}
    {...props}
  >
    {children}
  </label>
);

export default Label;
