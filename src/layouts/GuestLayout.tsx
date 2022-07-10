import { FC, ReactNode } from "react";

interface Props {
  children: ReactNode;
}
const GuestLayout: FC<Props> = ({ children }) => (
  <div className="font-sans text-gray-900 antialiased">{children}</div>
);

export default GuestLayout;
