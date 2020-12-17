import React from 'react';
import Header from '../../../containers/Navs/Navbar/index';
import Footer from '../../../containers/Navs/Footer';
import { ReactComponent as Logo } from '../../../assets/svg/spinner.svg';
import items from '../../../data';

const AdminLayout = ({ children }) => {
  return (
    <div>
      {/* <Header items={items} logo={<Logo />} navPosition="center" /> */}
      <main className="container-fluid">{children}</main>
      {/* <Footer /> */}
    </div>
  );
};

export default AdminLayout;
