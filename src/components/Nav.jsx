import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";
import '../styles.css';

export default function Nav({ numberOfItems }) {
  const navigate = useNavigate();

  function openMenu() {
    document.body.classList.add("menu--open");
  }

  function closeMenu() {
    document.body.classList.remove("menu--open");
  }

  return (
   <nav>
    <div className="nav__row">
      <div className="nav__logo" onClick={() => navigate("/")}>
        <img
          className="nav__logo--img rock"
          src="/assets/logo-no-background.png"
          alt="Logo"
        />
      </div>

      <ul className="nav__links">
        <li>
          <Link to="/" className="nav__link">Home</Link>
        </li>
        <li>
          <Link to="/movies" className="nav__link no-cursor">About</Link>
        </li>
        <li>
          <Link to="/signin" className="nav__link nav__link--primary no-cursor">Sign In</Link>
        </li>
        <li className="nav__logo">
          <Link to="/cart" className="nav__link">
            <FontAwesomeIcon icon="shopping-cart" />
          </Link>
          <span className="cart__length">{numberOfItems}</span>
        </li>
      </ul>

      <button className="btn__menu" onClick={openMenu} type="button">
        <FontAwesomeIcon icon="bars" />
      </button>

      <div className="menu__backdrop">
        <button className="btn__menu btn__menu--close" onClick={closeMenu} type="button">
          <FontAwesomeIcon icon="times" />
        </button>

        <ul className="menu__links">
          <li className="menu__list"><Link to="/" className="menu__link" onClick={closeMenu}>Home</Link></li>
          <li className="menu__list"><Link to="/movies" className="menu__link" onClick={closeMenu}>Movies</Link></li>
          <li className="menu__list"><Link to="/cart" className="menu__link" onClick={closeMenu}>Cart</Link></li>
          <li className="menu__list"><Link to="/signin" className="menu__link no-cursor" onClick={closeMenu}>Sign In</Link></li>
        </ul>
      </div>
    </div>
  </nav>
);
}
