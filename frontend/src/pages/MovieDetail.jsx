import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import API from "../api/axios";

const OMDB_KEY = import.meta.env.VITE_OMDB_KEY;

const MovieDetail = () => {
  const { id } = useParams(); // imdbID from URL
  const { user } = useAuth();
  const navigate = useNavigate();

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const [favId, setFavId] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  // Fetch movie details from OMDB
  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await fetch(
          `https://www.omdbapi.com/?i=${id}&plot=full&apikey=${OMDB_KEY}`
        );
        const data = await res.json();
        if (data.Response === "True") setMovie(data);
      } catch (err) {
        console.error("Failed to load movie");
      } finally {
        setLoading(false);
      }
    };
    fetchMovie();
  }, [id]);

  // Check if already in favorites
  useEffect(() => {
    if (!user) return;
    API.get("/api/favorites").then((res) => {
      const found = res.data.favorites.find((f) => f.imdbID === id);
      if (found) {
        setIsFavorite(true);
        setFavId(found._id);
      }
    });
  }, [user, id]);

  const handleAddFavorite = async () => {
    if (!user) return navigate("/login");
    setActionLoading(true);
    try {
      const res = await API.post("/api/favorites", {
        imdbID: movie.imdbID,
        title: movie.Title,
        year: movie.Year,
        poster: movie.Poster,
      });
      setIsFavorite(true);
      setFavId(res.data.favorite._id);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to add favorite");
    } finally {
      setActionLoading(false);
    }
  };

  const handleRemoveFavorite = async () => {
    setActionLoading(true);
    try {
      await API.delete(`/api/favorites/${favId}`);
      setIsFavorite(false);
      setFavId(null);
    } catch (err) {
      alert("Failed to remove favorite");
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="spinner-container">
        <div className="spinner-border text-danger" role="status" />
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger">Movie not found.</div>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <button
        className="btn btn-outline-secondary btn-sm mb-4"
        onClick={() => navigate(-1)}
      >
        ← Back
      </button>

      <div className="row g-4">
        {/* Poster */}
        <div className="col-md-3 text-center">
          <img
            src={
              movie.Poster !== "N/A"
                ? movie.Poster
                : "https://via.placeholder.com/300x450?text=No+Image"
            }
            alt={movie.Title}
            className="detail-poster"
          />
        </div>

        {/* Info */}
        <div className="col-md-9">
          <h1 style={{ fontWeight: 800 }}>{movie.Title}</h1>

          <div className="mt-2 mb-3">
            <span className="detail-badge">📅 {movie.Year}</span>
            <span className="detail-badge">⭐ {movie.imdbRating}</span>
            <span className="detail-badge">⏱ {movie.Runtime}</span>
            <span className="detail-badge">🔞 {movie.Rated}</span>
          </div>

          {/* Genre tags */}
          <div className="mb-3">
            {movie.Genre?.split(",").map((g) => (
              <span
                key={g}
                className="badge me-1"
                style={{ backgroundColor: "#e50914" }}
              >
                {g.trim()}
              </span>
            ))}
          </div>

          <p style={{ color: "#ccc", lineHeight: 1.7 }}>{movie.Plot}</p>

          <p className="mt-2" style={{ color: "#aaa" }}>
            <strong style={{ color: "#fff" }}>Director:</strong>{" "}
            {movie.Director}
          </p>
          <p style={{ color: "#aaa" }}>
            <strong style={{ color: "#fff" }}>Cast:</strong> {movie.Actors}
          </p>
          <p style={{ color: "#aaa" }}>
            <strong style={{ color: "#fff" }}>Language:</strong>{" "}
            {movie.Language}
          </p>

          {/* Favorite Button */}
          <div className="mt-4">
            {isFavorite ? (
              <button
                className="btn btn-outline-danger"
                onClick={handleRemoveFavorite}
                disabled={actionLoading}
              >
                ✕ Remove from Favorites
              </button>
            ) : (
              <button
                className="btn btn-danger"
                onClick={handleAddFavorite}
                disabled={actionLoading}
              >
                ❤️ Add to Favorites
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;