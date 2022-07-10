import { FC, ReactNode } from "react";
import { useRouter } from "next/router";
import Link, { LinkProps } from "next/link";
import { ButtonProps } from "react-html-props";
import NextLink from "./NextLink";

interface Props extends LinkProps {
  exact?: boolean;
  children: string | ReactNode;
  className?: string;
  activeClass?: string;
}

const ResponsiveNavLink: FC<Props> = ({
  exact,
  children,
  className,
  activeClass,
  ...props
}) => {
  const { pathname } = useRouter();
  let { href } = props;
  href = href.toString();
  const isActive = exact ? pathname === href : pathname.startsWith(href);

  return (
    <Link
      {...props}
      className={
        isActive
          ? "block pl-3 pr-4 py-2 border-l-4 text-base font-medium " +
            "leading-5 focus:outline-none transition duration-150 ease-in-out " +
            "border-indigo-400 text-indigo-700 bg-indigo-50 focus:text-indigo-800" +
            " focus:bg-indigo-100 focus:border-indigo-700"
          : "block pl-3 pr-4 py-2 border-l-4 text-base font-medium " +
            "leading-5 focus:outline-none transition duration-150 " +
            "ease-in-out border-transparent text-gray-600 hover:text-gray-800" +
            " hover:bg-gray-50 hover:border-gray-300 focus:text-gray-800 " +
            "focus:bg-gray-50 focus:border-gray-300"
      }
    >
      {children}
    </Link>
  );
};
export const ResponsiveNavButton: FC<ButtonProps> = (props) => (
  <button
    className="block w-full pl-3 pr-4 py-2 border-l-4
     text-left text-base font-medium leading-5 focus:outline-none
     transition duration-150 ease-in-out border-transparent
     text-gray-600 hover:text-gray-800 hover:bg-gray-50
     hover:border-gray-300 focus:text-gray-800 focus:bg-gray-50 focus:border-gray-300"
    {...props}
  />
);

export default ResponsiveNavLink;
