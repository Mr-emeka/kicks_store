import React from 'react';

const HeaderBurger = ({ toggleNav, isMenuOpen }) => {
  const openClass = isMenuOpen ? `open` : '';
  return (
    <div className={`burger ${openClass}`} onClick={() => toggleNav()}>
      <span className="burger__line" />
      <span className="burger__line" />
      <span className="burger__line" />
    </div>
  );
};

export default HeaderBurger;
