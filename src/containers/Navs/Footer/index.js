import React from "react";
import { FooterContainer } from "./footer.styled";
const Footer = () => {
  return (
    <FooterContainer>
      <div> By Aimes &copy; {new Date().getFullYear()}</div>
      <div></div>
    </FooterContainer>
  );
};

export default Footer;
