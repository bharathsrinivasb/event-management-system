import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";

const Login = () => {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Fix: Initialize navigate

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials), // Fix: Ensure credentials is defined
      });

      const result = await response.json();
      if (response.ok) {
        localStorage.setItem(
          "user",
          JSON.stringify({
            username: credentials.username,
            role: credentials.username === "admin" ? "admin" : "user",
          })
        );
        navigate("/"); // Fix: Ensure navigate is used correctly
        window.location.reload();
      } else {
        setError(result.message || "Login failed!"); // Fix: Ensure setError is defined
      }
    } catch (error) {
      setError("An error occurred. Please try again."); // Fix: Ensure setError is defined
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <input type="text" name="username" placeholder="Username" required onChange={handleChange} />
        <input type="password" name="password" placeholder="Password" required onChange={handleChange} />
        <button type="submit">Login</button>
        {error && <p className="error-message">{error}</p>}
        <p className="signup-link">
          Don't have an account? <a href="/signup">Sign up</a>
        </p>
        <p className="signup-link">
          Login as Admin? <a href="/adminlogin">Log in</a>
        </p>
      </form>
    </div>
  );
};

export default Login;
