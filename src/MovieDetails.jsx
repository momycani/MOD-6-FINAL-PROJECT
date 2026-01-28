import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getPricesForImdbID } from "./components/pricing";
import './styles.css';

const API_KEY = "fca438ff";

export default function MovieDetails({ addToCart }) {
  const { imdbID } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      try {
        const url = `https://www.omdbapi.com/?apikey=${API_KEY}&i=${imdbID}&plot=full`;
        const res = await fetch(url);
        const data = await res.json();

        if (!cancelled) setMovie(data.Response === "False" ? null : data);
      } catch {
        if (!cancelled) setMovie(null);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [imdbID]);

  if (loading) return <p style={{ padding: 16 }}>Loading...</p>;

  if (!movie) {
    return (
      <div style={{ padding: 16 }}>
        <button onClick={() => navigate(-1)}>← Back</button>
        <h2>Movie not found.</h2>
      </div>
    );
  }

  const poster =
    movie.Poster && movie.Poster !== "N/A"
      ? movie.Poster
      : "/assets/no-image.svg";

  const prices = getPricesForImdbID(movie.imdbID);
  const rentPrice = Number(prices.rent);
  const purchasePrice = Number(prices.purchase);

  return (
    <div className="movie-details">
      <button className="btn back-btn" type="button" onClick={() => navigate(-1)}>
        ← Back
      </button>

      <div className="movie-details__layout">
        <figure className="movie-details__poster">
          <img
            src={poster}
            alt={movie.Title}
            onError={(e) => (e.currentTarget.src = "/assets/no-image.svg")}
          />
        </figure>

        <div className="movie-details__info">
          <h1>{movie.Title}</h1>

          <p>
            <strong>{movie.Year}</strong> • {movie.Rated} • {movie.Runtime}
          </p>

          <p><strong>Genre:</strong> {movie.Genre}</p>
          <p><strong>Director:</strong> {movie.Director}</p>
          <p><strong>Actors:</strong> {movie.Actors}</p>

          <h3>Summary</h3>
          <p>{movie.Plot}</p>

          {Array.isArray(movie.Ratings) && movie.Ratings.length > 0 && (
            <>
              <h3>Ratings</h3>
              <ul>
                {movie.Ratings.map((r) => (
                  <li key={r.Source}>
                    {r.Source}: {r.Value}
                  </li>
                ))}
              </ul>
            </>
          )}

          <div className="movie-details__actions">
            <button
              className="add-to-cart-btn btn--outline"
              type="button"
              onClick={() =>
                addToCart({ ...movie, cartType: "rent", price: rentPrice })
              }
            >
              Rent • ${rentPrice.toFixed(2)}
            </button>

            <button
              className="btn"
              type="button"
              onClick={() =>
                addToCart({ ...movie, cartType: "purchase", price: purchasePrice })
              }
            >
              Buy • ${purchasePrice.toFixed(2)}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
