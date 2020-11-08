import React from "react";
import Navbar from "../../../containers/Navs/Navbar";
import Footer from "../../../containers/Navs/Footer";

const AdminLayout = ({ children }) => {
  return (
    <div>
      <Navbar />
      <main className="container-fluid">{children}</main>
      <Footer />
    </div>
  );
};

export default AdminLayout;