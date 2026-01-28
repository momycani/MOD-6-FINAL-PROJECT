import React from "react";
import { FontAwesomeIcon } from "@fontawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { faBars, faShoppingCart, faTimes, faStar, faStarHalfAlt, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const Nav = ({ numberOfItems }) => {
  function openMenu() {
    document.body.classList += " menu--open";
  }

  function closeMenu() {
    document.body.classList.remove("menu--open");
  }

  return (
    <nav>
      <div className="nav__container">
        <ul className="nav__links">
          <li className="nav__list">
            <Link to="/" className="nav__link">
              Home
            </Link>
          </li>
          <li className="nav__list">
            <Link to="/movies" className="nav__link">
              Movies
            </Link>
          </li>
          <button className="btn__menu" onClick={openMenu}>
            <FontAwesomeIcon icon="bars" />
          </button>
          <li className="nav__icon">
            <Link to="/cart" className="nav__link">
              <FontAwesomeIcon icon="shopping-cart" />
            </Link> 
            <span className="cart__length">{numberOfItems}</span>   
          </li>
        </ul> 
        <div className="menu__backdrop">
          <button className="btn__menu btn__menu--close" onClick={closeMenu}>
            <FontAwesomeIcon icon="times" />
          </button>
          <ul className="menu__links">
            <li className="menu__list">
              <Link to="/" className="menu__link">
                Home
              </Link>
            </li>
            <li className="menu__list">
              <Link to="/movies" className="menu__link">
                Movies
              </Link>
            </li>
            <li className="menu__list">
              <Link to="/cart" className="menu__link">
                Cart
              </Link>
            </li>
          </ul>
        </div>      
      </div>
    </nav>
  );
}

export default Nav;