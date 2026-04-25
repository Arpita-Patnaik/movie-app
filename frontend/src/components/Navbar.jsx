import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout, favCount } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark-custom">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand navbar-brand-custom">
          🎬 MovieApp
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navMenu"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navMenu">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink to="/" className="nav-link nav-link-custom">
                All Movies
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/search" className="nav-link nav-link-custom">
                Search
              </NavLink>
            </li>
            {user && (
              <li className="nav-item">
                <NavLink to="/favorites" className="nav-link nav-link-custom">
                  Favorites
                  {favCount > 0 && (
                    <span className="fav-badge">{favCount}</span>
                  )}
                </NavLink>
              </li>
            )}
          </ul>

          <ul className="navbar-nav ms-auto">
            {user ? (
              <>
                <li className="nav-item d-flex align-items-center me-3">
                  <span style={{ color: "#aaa", fontSize: "0.9rem" }}>
                    Hi, {user.username} 👋
                  </span>
                </li>
                <li className="nav-item">
                  <button
                    onClick={handleLogout}
                    className="btn btn-outline-danger btn-sm"
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <NavLink to="/login" className="nav-link nav-link-custom">
                    Login
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/register" className="nav-link nav-link-custom">
                    Register
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;