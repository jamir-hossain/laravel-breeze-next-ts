import { FC, ReactNode } from "react";
import Navigation from "./Navigation";

interface Props {
  children: ReactNode;
}
const AppLayout: FC<Props> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <Navigation />
      </header>

      {/* Page Content */}
      <main>{children}</main>
    </div>
  );
};

export default AppLayout;
