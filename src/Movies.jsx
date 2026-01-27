import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const API_KEY = "fca438ff"; 

const DEFAULT_PRICE_GROUP = "MEDIUM";
const PRICE_GROUPS = {
  LOW: { rent: "3.95", purchase: "18.95" },
  MEDIUM: { rent: "4.95", purchase: "19.95" },
  HIGH: { rent: "5.95", purchase: "20.95" },
  PREMIUM: { rent: "6.95", purchase: "21.95" },
};

const movieMeta = {
  tt0107688: { priceGroup: "MEDIUM" },
  // keep your mapping here
};

const BROWSE_QUERIES = [
  "movie", "film", "love", "war", "crime", "space",
  "hero", "adventure", "comedy", "drama", "horror",
  "thriller", "fantasy", "mystery", "romance"
];

function dedupeByImdbID(movies) {
  return Array.from(new Map(movies.map((m) => [m.imdbID, m])).values());
}

async function fetchMovies(query) {
  const url = `https://www.omdbapi.com/?apikey=${API_KEY}&s=${encodeURIComponent(query)}`;
  const res = await fetch(url);
  const data = await res.json();
  return data.Response === "False" ? [] : (data.Search || []);
}

function getPriceGroupForMovie(movie) {
  // If you manually set a price group, use it
  const meta = movieMeta[movie.imdbID];
  if (meta?.priceGroup) return meta.priceGroup;

  // Otherwise: stable "random" based on imdbID
  const groups = ["LOW", "MEDIUM", "HIGH", "PREMIUM"];
  const sum = movie.imdbID.split("").reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
  return groups[sum % groups.length];
}

export default function Movies() {
  const navigate = useNavigate();
  const { state } = useLocation();

  const mode = state?.mode || "browse";
  const queries = state?.queries || [];

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [empty, setEmpty] = useState(false);
  const [sort, setSort] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setEmpty(false);

      try {
        const qList = mode === "browse" ? BROWSE_QUERIES : queries;

        const results = await Promise.all(qList.map(fetchMovies));
        const combined = results.flat();
        const unique = dedupeByImdbID(combined);

        if (!cancelled) {
          setMovies(unique);
          setEmpty(unique.length === 0);
        }
      } catch {
        if (!cancelled) {
          setMovies([]);
          setEmpty(true);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [mode, JSON.stringify(queries)]);

  const sortedMovies = useMemo(() => {
    const arr = [...movies];

    if (sort === "A_to_Z") {
      arr.sort((a, b) => a.Title.localeCompare(b.Title));
    }

    if (sort === "LOW_TO_HIGH" || sort === "HIGH_TO_LOW") {
      arr.sort((a, b) => {
        const groupA = getPriceGroupForMovie(a);
        const groupB = getPriceGroupForMovie(b);

        const priceA = Number(PRICE_GROUPS[groupA].purchase);
        const priceB = Number(PRICE_GROUPS[groupB].purchase);

        return sort === "LOW_TO_HIGH" ? priceA - priceB : priceB - priceA;
      });
    }

    return arr;
  }, [movies, sort]);

return (
  <div id="movies__body">
    
    <nav>
      <div className="nav__container--movies">
        <img
          className="nav__logo--img rock"
          src="/assets/logo-no-background.png"
          alt="Logo"
          onClick={() => navigate("/")}
          style={{ cursor: "pointer" }}
        />

        <ul className="nav__links">
          <li>
            <a className="nav__link" type="button" onClick={() => navigate("/")} style={{ cursor: "pointer"}}>
              Home
            </a>
          </li>
          <li>
            <a href="#" className="nav__link no-cursor">
              Contact
            </a>
          </li>
          <li>
            <a href="#" className="nav__link nav__link--primary no-cursor">
              Sign In
            </a>
          </li>
        </ul>
      </div>
    </nav>

    <main id="movies__main">
      {/* Header + Sort */}
      <section id="movies">
        <div className="container">
          <div className="row">
            <div className="movies__header">
              <h2 className="section__title movies__header--title">
                All <span className="peru">Movies</span>
              </h2>

              <select value={sort} onChange={(e) => setSort(e.target.value)}>
                <option value="" disabled>
                  Sort
                </option>
                <option value="LOW_TO_HIGH">Price: Low to High</option>
                <option value="HIGH_TO_LOW">Price: High to Low</option>
                <option value="A_to_Z">A to Z</option>
              </select>
            </div>

            {/* Loading / Empty */}
            {loading && <p>Loading...</p>}

            {!loading && empty && (
              <section id="moviesEmptyState" className="movies-empty">
                <figure className="movies-empty__img">
                  <img src="/assets/undraw_home-cinema_jdm1.svg" alt="" />
                </figure>
                <h2>Could not find any matches related to your search.</h2>
                <p>Please change the filter or reset it below.</p>
                <button className="btn" type="button" onClick={() => navigate("/")}>
                  Reset filter
                </button>
              </section>
            )}

            {/* Movies grid */}
            {!loading && !empty && (
              <div className="movies" id="moviesList">
                {sortedMovies.map((movie) => {
                  const group = getPriceGroupForMovie(movie); const prices = PRICE_GROUPS[group];

                  const poster =
                    movie.Poster && movie.Poster !== "N/A"
                      ? movie.Poster
                      : "/assets/no-image.svg";

                  return (
                    <div className="movie" key={movie.imdbID} onClick={() => navigate(`/movies/${movie.imdbID}`)} 
                    style={{ cursor: "pointer" }}>
                      <figure className="movie__img--wrapper">
                        <img className="movie__img" src={poster} alt={movie.Title}  loading="lazy" onError={(e) => { e.currentTarget.src = "/assets/no-image.svg"; }} />
                      </figure>

                      <h3 className="movie__title">{movie.Title}</h3>

                      <div className="movie__prices">
                        <span className="movie__price--purchase">
                          Purchase: ${prices.purchase}
                        </span>
                        <span>Rent: ${prices.rent}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </section>
    </main>

    <footer>
      <div className="container">
        <div className="row row__column">
          <a href="#">
            <figure className="footer__logo rock">
              <img src="/assets/logo-no-background.png" className="footer__logo--img" alt="" />
            </figure>
          </a>
          <div className="footer__list">
            <a className="footer__link" type="button" onClick={() => navigate("/")} style={{ cursor: "pointer"}}>
              Home
            </a>
            <a className="footer__link no-cursor">About</a>
            <a className="footer__link" type="button" onClick={() => navigate("/")} style={{ cursor: "pointer"}}>
              Movies
            </a>
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