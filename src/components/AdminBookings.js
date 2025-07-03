import React, { useEffect, useState } from "react";
import "./AdminBooking.css"; // We'll add styles here

const AdminBooking = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://localhost:8080/api/admin/bookings")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch bookings");
        return res.json();
      })
      .then((data) => {
        setBookings(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading bookings...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="admin-booking-container">
      <h2>All Bookings</h2>
      <table className="booking-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Event ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Tickets</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map(({ id, eventId, name, email, phone, tickets }) => (
            <tr key={id}>
              <td>{id}</td>
              <td>{eventId}</td>
              <td>{name}</td>
              <td>{email}</td>
              <td>{phone}</td>
              <td>{tickets}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminBooking;
