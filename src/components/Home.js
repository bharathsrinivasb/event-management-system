import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  return (
    <div className="home-container">
      <h1>Welcome to Event Manager</h1>
      <p>Find and book tickets for the best events around you!</p>
      <Link to="/events">
        <button className="explore-btn">Explore Events</button>
      </Link>
    </div>
  );
};

export default Home;
