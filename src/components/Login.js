import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./login.css";

const Login = () => {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check for admin credentials locally
    if (credentials.username === "admin" && credentials.password === "123") {
      localStorage.setItem(
        "user",
        JSON.stringify({
          username: "admin",
          role: "admin",
        })
      );
      navigate("/"); 
      return;
    }

    // For other users, call backend API
    try {
      const response = await fetch("http://localhost:8080/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });

      const result = await response.json();
      if (response.ok) {
        localStorage.setItem(
          "user",
          JSON.stringify({
            username: credentials.username,
            role: "user",
          })
        );
        navigate("/"); // Redirect regular user to home
      } else {
        setError(result.message || "Login failed!");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit} aria-describedby="error-message">
        <h2>Login</h2>
        <input
          type="text"
          name="username"
          placeholder="Username"
          required
          onChange={handleChange}
          aria-label="Username"
          value={credentials.username}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          onChange={handleChange}
          aria-label="Password"
          value={credentials.password}
        />
        <button type="submit">Login</button>
        {error && (
          <p id="error-message" className="error-message" role="alert">
            {error}
          </p>
        )}
        <p className="signup-link">
          Don't have an account? <Link to="/signup">Sign up</Link>
        </p>

      </form>
    </div>
  );
};

export default Login;
