import { useNavigate } from "react-router-dom";

const PLACEHOLDER =
  "https://via.placeholder.com/300x450?text=No+Image";

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/movie/${movie.imdbID}`);
  };

  return (
    <div className="movie-card" onClick={handleClick}>
      <img
        src={movie.Poster !== "N/A" ? movie.Poster : PLACEHOLDER}
        alt={movie.Title}
        onError={(e) => (e.target.src = PLACEHOLDER)}
      />
      <div className="card-body p-2">
        <p className="card-title mb-1">{movie.Title}</p>
        <p className="card-text">{movie.Year}</p>
      </div>
    </div>
  );
};

export default MovieCard;