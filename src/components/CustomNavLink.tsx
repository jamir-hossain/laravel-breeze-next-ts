import { FC, ReactNode } from "react";
import Link, { LinkProps } from "next/link";
import { useRouter } from "next/router";

interface Props extends LinkProps {
  exact?: boolean;
  children: string | ReactNode;
  className?: string;
  activeClass?: string;
}

const CustomNavLink: FC<Props> = ({
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
          ? "inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium leading-5 focus:outline-none transition duration-150 ease-in-out border-indigo-400 text-gray-900 focus:border-indigo-700"
          : "inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium leading-5 focus:outline-none transition duration-150 ease-in-out border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:text-gray-700 focus:border-gray-300"
      }
    >
      {children}
    </Link>
  );
};
export default CustomNavLink;
