import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import API from "../api/axios";

const PLACEHOLDER = "https://via.placeholder.com/300x450?text=No+Image";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading]     = useState(true);
  const [deleting, setDeleting]   = useState(null); // track which item is deleting
  const { refreshFavCount }       = useAuth();
  const navigate                  = useNavigate();

  useEffect(() => {
    API.get("/api/favorites")
      .then((res) => setFavorites(res.data.favorites))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id) => {
    setDeleting(id);
    try {
      await API.delete(`/api/favorites/${id}`);
      // Optimistic UI: remove from list immediately
      setFavorites((prev) => prev.filter((f) => f._id !== id));
      refreshFavCount();
    } catch {
      alert("Failed to remove. Please try again.");
    } finally {
      setDeleting(null);
    }
  };

  if (loading) {
    return (
      <div className="spinner-container">
        <div className="spinner-border text-danger" role="status" />
      </div>
    );
  }

  if (favorites.length === 0) {
    return (
      <div className="container py-4">
        <h2 className="page-title">❤️ My Favorites</h2>
        <div className="empty-state">
          <div style={{ fontSize: "3rem" }}>🎞️</div>
          <h4>No favorites yet</h4>
          <p style={{ color: "#666" }}>
            Browse movies and click ❤️ to save them here
          </p>
          <button
            className="btn btn-danger mt-3"
            onClick={() => navigate("/search")}
          >
            Find Movies
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <h2 className="page-title">
        ❤️ My Favorites{" "}
        <span style={{ color: "#aaa", fontSize: "1rem", fontWeight: 400 }}>
          ({favorites.length})
        </span>
      </h2>

      <div className="row row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-5 g-3">
        {favorites.map((movie) => (
          <div className="col" key={movie._id}>
            <div className="movie-card">
              <img
                src={
                  movie.poster && movie.poster !== "N/A"
                    ? movie.poster
                    : PLACEHOLDER
                }
                alt={movie.title}
                onClick={() => navigate(`/movie/${movie.imdbID}`)}
                onError={(e) => (e.target.src = PLACEHOLDER)}
              />
              <div className="card-body p-2">
                <p className="card-title mb-1">{movie.title}</p>
                <p className="card-text mb-2">{movie.year}</p>
                <button
                  className="btn btn-outline-danger btn-sm w-100"
                  onClick={() => handleDelete(movie._id)}
                  disabled={deleting === movie._id}
                >
                  {deleting === movie._id ? "Removing..." : "✕ Remove"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favorites;