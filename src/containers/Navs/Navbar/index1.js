import React from 'react';
import { NavbarContainer, NavBrand } from './nav.styled.js';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <NavbarContainer>
      <NavBrand>
        <NavLink to="/">KickStore</NavLink>
      </NavBrand>
      <ul>
        <li>
          <NavLink to="/">Shop</NavLink>
        </li>
        <li>
          <NavLink to="/login">Sign In</NavLink>
        </li>
        <li>Cart</li>
      </ul>
    </NavbarContainer>
  );
};

export default Navbar;
