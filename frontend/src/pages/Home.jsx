import { useState, useEffect } from "react";
import MovieCard from "../components/MovieCard";

const OMDB_KEY = import.meta.env.VITE_OMDB_KEY;

// Default popular movies to show on home page
const DEFAULT_SEARCHES = ["Batman", "Avengers", "Spider-Man", "Inception"];

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDefaultMovies = async () => {
      try {
        // Fetch multiple search terms and combine results
        const promises = DEFAULT_SEARCHES.map((term) =>
          fetch(
            `https://www.omdbapi.com/?s=${term}&apikey=${OMDB_KEY}`
          ).then((r) => r.json())
        );

        const results = await Promise.all(promises);

        // Flatten, filter valid results, remove duplicates
        const allMovies = results
          .filter((r) => r.Response === "True")
          .flatMap((r) => r.Search)
          .filter(
            (movie, index, self) =>
              index === self.findIndex((m) => m.imdbID === movie.imdbID)
          );

        setMovies(allMovies);
      } catch (err) {
        setError("Failed to load movies");
      } finally {
        setLoading(false);
      }
    };

    fetchDefaultMovies();
  }, []);

  if (loading) {
    return (
      <div className="spinner-container">
        <div className="spinner-border text-danger" role="status" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger">{error}</div>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <h2 className="page-title">🎬 All Movies</h2>
      <div className="row row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-5 g-3">
        {movies.map((movie) => (
          <div className="col" key={movie.imdbID}>
            <MovieCard movie={movie} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;