import "./styles.css";
import { BrowserRouter as Router, Routes, Route  } from "react-router-dom";
import Home from "./Home";
import Movies from "./Movies";
import MovieDetails from "./MovieDetails";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/movies/:imdbID" element={<MovieDetails />} />
      </Routes>
    </Router>
  );
}



