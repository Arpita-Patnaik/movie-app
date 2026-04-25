import { useState } from "react";
import MovieCard from "../components/MovieCard";
import { SkeletonGrid } from "../components/SkeletonCard";

const OMDB_KEY    = import.meta.env.VITE_OMDB_KEY;
const MAX_RECENT  = 5;

const Search = () => {
  const [query, setQuery]     = useState("");
  const [movies, setMovies]   = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState("");
  const [searched, setSearched] = useState(false);
  const [recent, setRecent]   = useState(
    () => JSON.parse(localStorage.getItem("recentSearches") || "[]")
  );

  const saveRecent = (term) => {
    const updated = [term, ...recent.filter((r) => r !== term)].slice(
      0,
      MAX_RECENT
    );
    setRecent(updated);
    localStorage.setItem("recentSearches", JSON.stringify(updated));
  };

  const handleSearch = async (searchTerm = query) => {
    const term = searchTerm.trim();
    if (!term) return;

    setLoading(true);
    setError("");
    setSearched(true);
    setQuery(term);

    try {
      const res  = await fetch(
        `https://www.omdbapi.com/?s=${encodeURIComponent(term)}&apikey=${OMDB_KEY}`
      );
      const data = await res.json();

      if (data.Response === "True") {
        setMovies(data.Search);
        saveRecent(term);
      } else {
        setMovies([]);
        setError(data.Error || "No movies found");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <div className="container py-4 page-enter">
      <h2 className="page-title">🔍 Search Movies</h2>

      {/* Search Box */}
      <div className="search-wrapper">
        <div className="search-bar">
          <input
            type="text"
            className="form-control"
            placeholder="Search for any movie..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
          />
          <button onClick={() => handleSearch()} disabled={loading}>
            {loading ? "..." : "Search"}
          </button>
        </div>

        {/* Recent Searches */}
        {recent.length > 0 && !searched && (
          <div className="text-center mt-3">
            <span style={{ color: "#666", fontSize: "0.8rem" }}>
              Recent:{" "}
            </span>
            {recent.map((r) => (
              <span
                key={r}
                className="recent-chip"
                onClick={() => handleSearch(r)}
              >
                {r}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Results count */}
      {!loading && movies.length > 0 && (
        <p className="text-secondary mb-3" style={{ fontSize: "0.9rem" }}>
          Found <strong style={{ color: "#fff" }}>{movies.length}</strong>{" "}
          results for "{query}"
        </p>
      )}

      {/* Skeleton */}
      {loading && <SkeletonGrid count={8} />}

      {/* Error / No results */}
      {!loading && error && (
        <div className="empty-state">
          <span className="empty-icon">🎭</span>
          <h4>{error}</h4>
          <p>Try a different keyword</p>
        </div>
      )}

      {/* Results */}
      {!loading && movies.length > 0 && (
        <div className="row row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-5 g-3">
          {movies.map((movie) => (
            <div className="col" key={movie.imdbID}>
              <MovieCard movie={movie} />
            </div>
          ))}
        </div>
      )}

      {/* Initial state */}
      {!loading && !searched && (
        <div className="empty-state">
          <span className="empty-icon">🎬</span>
          <h4>Find your next favourite movie</h4>
          <p>Type a title above and hit Search</p>
        </div>
      )}
    </div>
  );
};

export default Search;