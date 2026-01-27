import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

const SEARCH_MAP = {
  holiday: ["christmas", "holiday", "winter"],
  family: ["family", "kids", "animated"],
  action: ["action", "adventure", "hero"],
  comedy: ["comedy", "funny", "laugh"],
  drama: ["drama", "life", "story"],
  horror: ["horror", "ghost", "zombie", "thriller"],
  romance: ["romance", "love", "heart"],
};

function normalizeQuery(q) {
  const x = q.toLowerCase().trim();

  if (["holiday", "holidays", "christmas", "xmas"].includes(x)) return "holiday";
  if (["family", "families", "kids", "animated"].includes(x)) return "family";
  if (["action", "actions", "adventure", "hero"].includes(x)) return "action";
  if (["comedy", "funny", "laugh"].includes(x)) return "comedy";
  if (["drama", "dramatic"].includes(x)) return "drama";
  if (["horror", "scary", "terror", "thriller"].includes(x)) return "horror";
  if (["romance", "romantic", "love"].includes(x)) return "romance";

  return "other";
}

export default function Home() {
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);

  const [value, setValue] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const type = useMemo(() => normalizeQuery(value), [value]);

  function openMenu() {
    setMenuOpen(true);
  }
  function closeMenu() {
    setMenuOpen(false);
  }

  function runSearch() {
    const t = normalizeQuery(value);

    if (t === "other") {
      setError(true);
      return;
    }

    const queries = SEARCH_MAP[t];
    setError(false);
    setLoading(true);

    // Navigate to Movies page with search queries
    navigate("/movies", { state: { mode: "search", queries } });

    setLoading(false);
  }

  function browseAll() {
    setError(false);
    navigate("/movies", { state: { mode: "browse", queries: [] } });
  }

  return (
    <div className={menuOpen ? "menu--open" : ""}>
      <section id="landing">
        <nav>
          <div className="nav__row">
            <div className="nav__logo">
              <img
                className="nav__logo--img rock"
                src="/assets/logo-no-background.png"
                alt="Logo"
              />
              <div className="nav__logo--title"></div>
            </div>

            <div className="nav__links">
              <a href="#" className="nav__link no-cursor">
                About
              </a>
              <a href="#" className="nav__link no-cursor">
                Contact Us
              </a>
              <a href="#" className="nav__link nav__link--primary no-cursor">
                Sign Up
              </a>
            </div>

            <button className="btn__menu" onClick={openMenu} type="button">
              <i className="fa-solid fa-bars"></i>
            </button>

            <div className="menu__backdrop">
              <button
                className="btn__menu btn__menu--close"
                onClick={closeMenu}
                type="button"
              >
                <i className="fa-solid fa-times"></i>
              </button>

              <ul className="menu__links">
                <li className="menu__list">
                  <a href="#" className="menu__link no-cursor" onClick={closeMenu}>
                    About
                  </a>
                </li>
                <li className="menu__list">
                  <a href="#" className="menu__link no-cursor" onClick={closeMenu}>
                    Contact Us
                  </a>
                </li>
                <li className="menu__list">
                  <a
                    href="#"
                    className="menu__link menu__link--primary no-cursor"
                    onClick={closeMenu}
                  >
                    Sign In
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <header>
          <div className="header__container">
            <div className="header__description">
              <h1>
                America's <span className="peru">top</span> choice for movie reviews,
                purchase, and rentals.
              </h1>
              <h2>
                Discover a movie that matches your{" "}
                <span className="peru hover-wiggle">vibe.</span>
              </h2>

              <div className="header__search-area">
                {!error ? (
                  <div className="header__search" id="searchNormal">
                    <input
                      type="text"
                      className="header__search--input"
                      placeholder="Search movies by genre..."
                      value={value}
                      onChange={(e) => {
                        setValue(e.target.value);
                        setError(false);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") runSearch();
                      }}
                    />

                    <button
                      type="button"
                      className="header__btn"
                      onClick={runSearch}
                      disabled={loading}
                    >
                      <span className="btn__iconwrap">
                        <i
                          className={`fa-solid fa-magnifying-glass btn__icon ${
                            loading ? "" : "is-visible"
                          }`}
                        ></i>
                        <i
                          className={`fa-solid fa-spinner movies__loading--spinner ${
                            loading ? "is-visible" : ""
                          }`}
                        ></i>
                      </span>
                    </button>
                  </div>
                ) : (
                  <div className="header__search-error" id="searchError">
                    <p className="search-error__text">Could not find any matches.</p>
                    <div className="search-error__actions">
                      <button type="button" className="btn btn--small" onClick={() => setError(false)}>
                        Try Again
                      </button>
                      <button
                        type="button"
                        className="btn btn--small btn--outline"
                        onClick={() => {
                          setValue("");
                          setError(false);
                        }}
                      >
                        Reset filter
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <figure className="header__img--wrapper">
              <img src="/assets/undraw_home-cinema_jdm1.svg" alt="" />
            </figure>
          </div>
        </header>
      </section>      

        <section id="browse-movies-cta">
          <div className="container browse-movies-cta">
            <button type="button" className="btn" onClick={browseAll}>
              Browse All Movies
            </button>
          </div>
        </section>     

      <footer>
        <div className="container footer__container">
          <div className="row row__column">
            <a href="#">
              <figure className="footer__logo">
                <img
                  src="/assets/logo-no-background.png"
                  className="footer__logo--img rock"
                  alt=""
                />
              </figure>
            </a>

            <div className="footer__list">
              <a className="footer__link no-cursor">About</a>
              <a className="footer__link no-cursor">Contact</a>
            </div>

            <div className="footer__copyright">
              Copyright &copy; 2025 Beth Coleman Kenward
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
