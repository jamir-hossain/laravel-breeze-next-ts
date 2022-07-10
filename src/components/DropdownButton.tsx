import { FC } from "react";
import { Menu } from "@headlessui/react";
import { ButtonProps } from "react-html-props";

interface Props extends ButtonProps {
  children: string;
  className?: string;
}

const DropdownButton: FC<Props> = ({ children, className, ...props }) => (
  <Menu.Item>
    {({ active }) => (
      <button
        className={`w-full text-left block px-4 py-2 
        text-sm leading-5 text-gray-700 ${active ? "bg-gray-100" : ""}
         focus:outline-none transition duration-150 ease-in-out ${className}`}
        {...props}
      >
        {children}
      </button>
    )}
  </Menu.Item>
);

export default DropdownButton;
