import React from 'react';

const HeaderNav = React.forwardRef(({ items, isMenuOpen }, ref) => {
  const openClass = isMenuOpen ? 'open' : '';

  return (
    <nav className={`nav ${openClass}`} ref={ref}>
      {items.map((item) => (
        <a href={item.slug} key={item.id} className="nav__item" ref={item.ref}>
          {item.name}
        </a>
      ))}
    </nav>
  );
});

export default HeaderNav;
