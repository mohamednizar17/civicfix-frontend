import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar-root">
      <div className="navbar-brand">
        <Link to="/" className="navbar-logo">
          <span className="navbar-logo-icon">🌐</span>
          <span className="navbar-logo-text">CivicFix</span>
        </Link>
      </div>

      <div className="navbar-links">
        <Link to="/" className="navbar-link">Home</Link>
        <Link to="/submit" className="navbar-link">Submit</Link>
        <Link to="/dashboard" className="navbar-link">Dashboard</Link>
        <Link to="/faq" className="navbar-link">FAQ</Link>
        {user?.role === 'admin' && (
          <Link to="/admin-tools" className="navbar-link">Admin</Link>
        )}
        {!user && (
          <>
            <Link to="/login" className="navbar-link">Login</Link>
            <Link to="/register" className="navbar-link">Register</Link>
          </>
        )}
      </div>

      {user && (
        <div className="navbar-user">
          <span className="navbar-user-greet">
            Hi, {user.name}
          </span>
          <button onClick={logout} className="navbar-logout-btn">
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}

export default Navbar;