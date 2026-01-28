import React from "react";
import { Link } from "react-router-dom";
import './styles.css';

const Footer = () => {
    return (
        <footer>
        <div className="container footer__container">
          <div className="row row__column">
            <Link to ="/">
              <figure className="footer__logo">
                <img
                  src="/assets/logo-no-background.png"
                  className="footer__logo--img rock"
                  alt=""/>
              </figure>
              </Link>
            <div className="footer__list">
              <Link to="/" className="footer__link no-cursor">About</Link>
              <Link to="/" className="footer__link no-cursor">Contact</Link>
            </div>

            <div className="footer__copyright">
              Copyright &copy; 2025 Beth Coleman Kenward
            </div>
          </div>
        </div>
      </footer>
    );
}

export default Footer;