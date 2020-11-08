import React from "react";
import Footer from "../../../containers/Navs/Footer";

const AuthLayout = ({ children }) => {
  return (
    <div>
      <main className="container-fluid">{children}</main>
      <Footer />
    </div>
  );
};

export default AuthLayout;
