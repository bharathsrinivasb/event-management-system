import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Header.css";

const Header = () => {
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Failed to parse user from localStorage:", error);
        localStorage.removeItem("user");
      }
    }
  }, []);

  const isLoggedIn = !!user;
  const isAdmin = user?.role === "admin";

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
    setMenuOpen(false);
  };

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  const handleLinkClick = () => {
    setMenuOpen(false);
  };

  return (
    <nav className="navbar" role="navigation" aria-label="Main navigation">
      <div className="logo">
        <Link to="/" aria-label="Go to homepage" onClick={handleLinkClick}>
          EventBooking
        </Link>
      </div>

      {/* Hamburger menu button */}
      <button
        className={`menu-toggle ${menuOpen ? "open" : ""}`}
        onClick={toggleMenu}
        aria-label={menuOpen ? "Close menu" : "Open menu"}
        aria-expanded={menuOpen}
      >
        <span className="hamburger"></span>
      </button>

      {/* Navigation links */}
      <ul className={`nav-links ${menuOpen ? "active" : ""}`}>
        <li>
          <Link to="/" onClick={handleLinkClick}>
            Home
          </Link>
        </li>

        <li>
          <Link to="/events" onClick={handleLinkClick}>
            Events
          </Link>
        </li>

        <li>
          <Link to="/about" onClick={handleLinkClick}>
            About Us
          </Link>
        </li>

        {/* Show My Bookings only for logged-in non-admin users */}
        {isLoggedIn && !isAdmin && (
          <li>
            <Link to="/my-bookings" onClick={handleLinkClick}>
              My Bookings
            </Link>
          </li>
        )}

        {/* Admin-specific links */}
        {isAdmin && (
          <>
            <li>
              <Link to="/create-event" onClick={handleLinkClick}>
                Manage Events
              </Link>
            </li>
            <li>
              <Link to="/admin/users" onClick={handleLinkClick}>
                Users
              </Link>
            </li>
            <li>
              <Link to="/all-bookings" onClick={handleLinkClick}>
                All Bookings
              </Link>
            </li>
            <li>
              <Link to="/admin/dashboard" onClick={handleLinkClick}>
                Admin Panel
              </Link>
            </li>
          </>
        )}

        {isLoggedIn ? (
          <li>
            <button
              className="logout-btn"
              onClick={handleLogout}
              aria-label="Logout"
            >
              Logout
            </button>
          </li>
        ) : (
          <>
            <li>
              <Link to="/login" onClick={handleLinkClick}>
                Login
              </Link>
            </li>

            <li>
              <Link to="/signup" onClick={handleLinkClick}>
                Sign Up
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Header;
