import { useState } from "react";
import MovieCard from "../components/MovieCard";

const OMDB_KEY = import.meta.env.VITE_OMDB_KEY;

const Search = () => {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searched, setSearched] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError("");
    setSearched(true);

    try {
      const res = await fetch(
        `https://www.omdbapi.com/?s=${encodeURIComponent(query)}&apikey=${OMDB_KEY}`
      );
      const data = await res.json();

      if (data.Response === "True") {
        setMovies(data.Search);
      } else {
        setMovies([]);
        setError(data.Error || "No movies found");
      }
    } catch (err) {
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-4">
      <h2 className="page-title">🔍 Search Movies</h2>

      {/* Search Bar */}
      <form onSubmit={handleSearch} className="mb-4">
        <div className="input-group search-bar">
          <input
            type="text"
            className="form-control"
            placeholder="Search for a movie..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="submit" disabled={loading}>
            {loading ? "Searching..." : "Search"}
          </button>
        </div>
      </form>

      {/* Loading */}
      {loading && (
        <div className="spinner-container">
          <div className="spinner-border text-danger" role="status" />
        </div>
      )}

      {/* Error / No Results */}
      {!loading && error && (
        <div className="empty-state">
          <div style={{ fontSize: "3rem" }}>🎭</div>
          <h4>{error}</h4>
          <p>Try a different movie name</p>
        </div>
      )}

      {/* Results */}
      {!loading && movies.length > 0 && (
        <>
          <p className="text-secondary mb-3">
            Found {movies.length} results for "{query}"
          </p>
          <div className="row row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-5 g-3">
            {movies.map((movie) => (
              <div className="col" key={movie.imdbID}>
                <MovieCard movie={movie} />
              </div>
            ))}
          </div>
        </>
      )}

      {/* Initial state */}
      {!loading && !searched && (
        <div className="empty-state">
          <div style={{ fontSize: "3rem" }}>🎬</div>
          <h4>Search for any movie</h4>
          <p>Results will appear here</p>
        </div>
      )}
    </div>
  );
};

export default Search;