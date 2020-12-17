import React from 'react';
import Header from '../../../containers/Navs/Navbar/index';
// import Footer from "../../../containers/Navs/Footer";
import items from '../../../data';
import { ReactComponent as Logo } from '../../../assets/svg/kicksstore.svg';

const AppLayout = ({ children }) => {
  return (
    <div>
      <Header items={items} logo={<Logo />} navPosition="center" />
      <main className="container-fluid">{children}</main>
      {/* <Footer /> */}
    </div>
  );
};

export default AppLayout;
