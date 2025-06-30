import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Header.css";

const Header = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve user info from localStorage once component mounts
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
  const isAdmin = user?.username === "admin";

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };

  return (
    <nav className="navbar" role="navigation" aria-label="Main navigation">
      <div className="logo">
        <Link to="/" aria-label="Go to homepage">
          EventBooking
        </Link>
      </div>

      <ul className="nav-links">
        <li>
          <Link to="/">Home</Link>
        </li>

        <li>
          <Link to="/events">Events</Link>
        </li>

        <li>
          <Link to="/about">About Us</Link>
        </li>

        {/* Show My Bookings only for logged-in non-admin users */}
        {isLoggedIn && !isAdmin && (
          <li>
            <Link to="/my-bookings">My Bookings</Link>
          </li>
        )}

        {isLoggedIn ? (
          <>
            {/* Optionally, show Admin Panel link for admins */}
            {isAdmin && (
              <li>
                <Link to="/admin">Admin Panel</Link>
              </li>
            )}
            <li>
              <button
                className="logout-btn"
                onClick={handleLogout}
                aria-label="Logout"
              >
                Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>

            <li>
              <Link to="/signup">Sign Up</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Header;
