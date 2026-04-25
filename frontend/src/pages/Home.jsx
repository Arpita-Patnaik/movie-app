import { useState, useEffect } from "react";
import MovieCard from "../components/MovieCard";
import { SkeletonGrid } from "../components/SkeletonCard";
import { useNavigate } from "react-router-dom";

const OMDB_KEY        = import.meta.env.VITE_OMDB_KEY;
const DEFAULT_SEARCHES = ["Batman", "Avengers", "Spider-Man", "Inception"];

const Home = () => {
  const [movies, setMovies]   = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState("");
  const navigate              = useNavigate();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const promises = DEFAULT_SEARCHES.map((term) =>
          fetch(`https://www.omdbapi.com/?s=${term}&apikey=${OMDB_KEY}`)
            .then((r) => r.json())
        );
        const results = await Promise.all(promises);
        const all = results
          .filter((r) => r.Response === "True")
          .flatMap((r) => r.Search)
          .filter(
            (m, i, self) => i === self.findIndex((x) => x.imdbID === m.imdbID)
          );
        setMovies(all);
      } catch {
        setError("Failed to load movies. Check your OMDB key.");
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, []);

  return (
    <div className="page-enter">
      {/* Hero */}
      <div className="hero">
        <h1>
          Discover <span>Amazing</span> Movies
        </h1>
        {/* <p>Search thousands of movies and build your personal watchlist</p> */}
        {/* <button
          className="btn btn-danger mt-3 px-4 py-2 fw-bold"
          onClick={() => navigate("/search")}
        >
          🔍 Start Searching
        </button> */}
      </div>

      {/* Movie Grid */}
      <div className="container py-4">
        <h2 className="page-title">🎬 Popular Movies</h2>

        {error && (
          <div className="alert alert-danger">{error}</div>
        )}

        {loading ? (
          <SkeletonGrid count={10} />
        ) : (
          <div className="row row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-5 g-3">
            {movies.map((movie) => (
              <div className="col" key={movie.imdbID}>
                <MovieCard movie={movie} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;