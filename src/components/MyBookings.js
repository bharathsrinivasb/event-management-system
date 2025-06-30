import { useEffect, useState } from "react";
// import "./MyBookings.css";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (user) {
      fetch(`http://localhost:8080/api/bookings/${user.username}`)
        .then((response) => response.json())
        .then((data) => setBookings(data))
        .catch((error) => console.error("Error fetching bookings:", error));
    }
  }, [user]);

  return (
    <div className="bookings-container">
      <h2>My Bookings</h2>
      {bookings.length > 0 ? (
        <ul>
          {bookings.map((booking) => (
            <li key={booking.id}>
              <strong>{booking.eventTitle}</strong> - {booking.date} at {booking.time} - {booking.venue}
            </li>
          ))}
        </ul>
      ) : (
        <p>No bookings found.</p>
      )}
    </div>
  );
};

export default MyBookings;
