import { useRouter } from "next/router";
import Link, { LinkProps } from "next/link";
import { ReactNode } from "react";

interface Props extends LinkProps {
  exact?: boolean;
  children: string | ReactNode;
  className?: string;
  activeClass?: string;
}

const NextLink: React.FC<Props> = ({
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
    <Link {...props}>
      <a className={`${(isActive && activeClass) || "active"} ${className}`}>
        {children}
      </a>
    </Link>
  );
};

export default NextLink;
