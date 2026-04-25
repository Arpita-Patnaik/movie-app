import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import API from "../api/axios";
import Toast, { useToast } from "../components/Toast";

const OMDB_KEY    = import.meta.env.VITE_OMDB_KEY;
const PLACEHOLDER = "https://via.placeholder.com/300x450?text=No+Image";
const safe = (val, fallback = "Unknown") =>
  !val || val === "N/A" ? fallback : val;

const MovieDetail = () => {
  const { id }                      = useParams();
  const { user, refreshFavCount }   = useAuth();
  const navigate                    = useNavigate();
  const { toasts, showToast }       = useToast();
  const hasFetched                  = useRef(false);

  const [movie, setMovie]                   = useState(null);
  const [loading, setLoading]               = useState(true);
  const [error, setError]                   = useState("");
  const [isFavorite, setIsFavorite]         = useState(false);
  const [favId, setFavId]                   = useState(null);
  const [actionLoading, setActionLoading]   = useState(false);

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;
    fetch(`https://www.omdbapi.com/?i=${id}&plot=full&apikey=${OMDB_KEY}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.Response === "True") setMovie(data);
        else setError("Movie not found.");
      })
      .catch(() => setError("Failed to load movie."))
      .finally(() => setLoading(false));
  }, [id]);

  useEffect(() => {
    if (!user) return;
    API.get("/api/favorites")
      .then((res) => {
        const found = res.data.favorites.find((f) => f.imdbID === id);
        if (found) { setIsFavorite(true); setFavId(found._id); }
      })
      .catch(() => {});
  }, [user, id]);

  const handleAddFavorite = async () => {
    if (!user) return navigate("/login");
    if (actionLoading) return;
    setActionLoading(true);
    try {
      const res = await API.post("/api/favorites", {
        imdbID : movie.imdbID,
        title  : movie.Title,
        year   : movie.Year,
        poster : movie.Poster,
      });
      setIsFavorite(true);
      setFavId(res.data.favorite._id);
      refreshFavCount();
      showToast("Added to favorites!", "success");
    } catch (err) {
      showToast(err.response?.data?.message || "Failed to add", "error");
    } finally {
      setActionLoading(false);
    }
  };

  const handleRemoveFavorite = async () => {
    if (actionLoading) return;
    setActionLoading(true);
    try {
      await API.delete(`/api/favorites/${favId}`);
      setIsFavorite(false);
      setFavId(null);
      refreshFavCount();
      showToast("Removed from favorites", "info");
    } catch {
      showToast("Failed to remove", "error");
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

  if (error || !movie) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger">{error || "Movie not found."}</div>
        <button className="btn btn-outline-secondary mt-2" onClick={() => navigate(-1)}>
          ← Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="container py-5 page-enter">
      <Toast toasts={toasts} />

      <button
        className="btn btn-outline-secondary btn-sm mb-4"
        onClick={() => navigate(-1)}
      >
        ← Back
      </button>

      <div className="row g-5 detail-container">
        {/* Poster */}
        <div className="col-md-4 text-center">
          <img
            src={safe(movie.Poster) !== "Unknown" ? movie.Poster : PLACEHOLDER}
            alt={movie.Title}
            className="detail-poster"
            onError={(e) => (e.target.src = PLACEHOLDER)}
          />

          {/* IMDB Rating */}
          {movie.imdbRating && movie.imdbRating !== "N/A" && (
            <div className="mt-3 d-flex justify-content-center">
              <div className="imdb-rating">
                ⭐ {movie.imdbRating}
                <span style={{ fontWeight: 400, fontSize: "0.8rem" }}>
                  /10 IMDb
                </span>
              </div>
            </div>
          )}

          {/* Favorite Button */}
          <div className="mt-3">
            {isFavorite ? (
              <button
                className="btn btn-outline-danger w-100"
                onClick={handleRemoveFavorite}
                disabled={actionLoading}
              >
                {actionLoading ? "Removing..." : "✕ Remove from Favorites"}
              </button>
            ) : (
              <button
                className="btn btn-danger w-100"
                onClick={handleAddFavorite}
                disabled={actionLoading}
              >
                {actionLoading ? "Adding..." : "❤️ Add to Favorites"}
              </button>
            )}
          </div>
        </div>

        {/* Info */}
        <div className="col-md-8">
          <h1 style={{ fontWeight: 900, fontSize: "2rem" }}>{movie.Title}</h1>

          {/* Meta badges */}
          <div className="mt-2 mb-3">
            <span className="detail-badge">📅 {safe(movie.Year)}</span>
            <span className="detail-badge">⏱ {safe(movie.Runtime)}</span>
            <span className="detail-badge">🔞 {safe(movie.Rated)}</span>
            <span className="detail-badge">🌍 {safe(movie.Language)}</span>
          </div>

          {/* Genre chips */}
          {movie.Genre && movie.Genre !== "N/A" && (
            <div className="mb-3">
              {movie.Genre.split(",").map((g) => (
                <span key={g} className="genre-tag">{g.trim()}</span>
              ))}
            </div>
          )}

          {/* Plot */}
          <p style={{ color: "#343a40", lineHeight: 1.85, fontSize: "0.97rem" }}>
            {safe(movie.Plot, "No plot summary available.")}
          </p>

          {/* Meta details */}
          <div className="detail-meta mt-3">
            {[
              ["🎬 Director", movie.Director],
              ["🎭 Cast",     movie.Actors],
              ["🏆 Awards",   movie.Awards],
              ["🌐 Country",  movie.Country],
              ["📦 Box Office", movie.BoxOffice],
            ].map(([label, value]) =>
              value && value !== "N/A" ? (
                <p key={label}>
                  <strong>{label}:</strong> {value}
                </p>
              ) : null
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;