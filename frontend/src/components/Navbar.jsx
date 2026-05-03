import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/Navbar.css';

export default function Navbar() {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          💼 Tech Freelance Hub
        </Link>

        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/" className="nav-link">
              Home
            </Link>
          </li>

          {isAuthenticated && (
            <>
              <li className="nav-item">
                <Link to="/jobs" className="nav-link">
                  Jobs
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/dashboard" className="nav-link">
                  Dashboard
                </Link>
              </li>
            </>
          )}

          <li className="nav-item">
            {isAuthenticated ? (
              <div className="nav-user-section">
                <span className="nav-user-name">Welcome, {user?.name}</span>
                <button onClick={handleLogout} className="nav-link logout-btn">
                  Logout
                </button>
              </div>
            ) : (
              <>
                <Link to="/login" className="nav-link">
                  Login
                </Link>
                <Link to="/register" className="nav-link register-link">
                  Register
                </Link>
              </>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
}
