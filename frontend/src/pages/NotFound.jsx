import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="not-found page-enter">
      <h1>404</h1>
      <h2>Page Not Found</h2>
      <p style={{ color: "#666", marginBottom: "2rem" }}>
        The page you're looking for doesn't exist.
      </p>
      <button className="btn btn-danger" onClick={() => navigate("/")}>
        Go Home
      </button>
    </div>
  );
};

export default NotFound;