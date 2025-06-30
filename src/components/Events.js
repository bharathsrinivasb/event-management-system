import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Events.css";

const Events = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/events")
      .then((response) => response.json())
      .then((data) => setEvents(data))
      .catch((error) => console.error("Error fetching events:", error));
  }, []);

  return (
    <div className="events-wrapper"> 
    <div className="events-container">
      <h2>Available Events</h2>
      <div className="events-list">
        {events.length > 0 ? (
          events.map((event) => (
            <div key={event.id} className="event-card">
              <h3>{event.title}</h3>
              <p>{event.description}</p>
              <p><strong>Date:</strong> {event.date}</p>
              <p><strong>Time:</strong> {event.time}</p>
              <p><strong>Venue:</strong> {event.venue}, {event.city}</p>
              <Link to={`/book/${event.id}`}>
                <button className="book-now-button">Book Now</button>
              </Link>
            </div>
          ))
        ) : (
          <p>No events available.</p>
        )}
      </div>
    </div>
    </div>
  );
};

export default Events;
