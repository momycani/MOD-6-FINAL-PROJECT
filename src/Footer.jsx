import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./styles.css";

export default function Footer() {
  const navigate = useNavigate();

  function browseAll() {
    window.scrollTo({ top: 0, behavior: "instant"});

    navigate("/movies", {
      state: { mode: "browse", queries: [] },
    });
  }

  return (
    <footer>
      <section id="browse-movies-cta">
        <div className="container browse-movies-cta">
          <button type="button" className="btn" onClick={browseAll}>
            Browse All Movies
          </button>
        </div>
      </section>

      <div className="container footer__container">
        <div className="row row__column">
          <Link to="/">
            <figure className="footer__logo">
              <img
                src="/assets/logo-no-background.png"
                className="footer__logo--img rock"
                alt=""
              />
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
