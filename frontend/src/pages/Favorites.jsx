import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

const PLACEHOLDER = "https://via.placeholder.com/300x450?text=No+Image";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchFavorites = async () => {
    try {
      const res = await API.get("/api/favorites");
      setFavorites(res.data.favorites);
    } catch (err) {
      console.error("Failed to fetch favorites");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  const handleDelete = async (id) => {
    try {
      await API.delete(`/api/favorites/${id}`);
      setFavorites((prev) => prev.filter((f) => f._id !== id));
    } catch (err) {
      alert("Failed to remove favorite");
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
          <p>Search for movies and add them to your favorites</p>
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
          ({favorites.length} movies)
        </span>
      </h2>

      <div className="row row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-5 g-3">
        {favorites.map((movie) => (
          <div className="col" key={movie._id}>
            <div className="movie-card">
              <img
                src={movie.poster !== "N/A" ? movie.poster : PLACEHOLDER}
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
                >
                  ✕ Remove
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