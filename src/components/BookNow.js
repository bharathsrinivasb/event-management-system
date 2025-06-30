import { useState } from "react";
import "./BookNow.css"

const BookNow = ({ eventId }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    tickets: 1,
  });

  const username = localStorage.getItem("username"); // Get logged-in user

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8080/api/book/${eventId}/${username}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (response.ok) {
        alert("Booking successful!");
      } else {
        alert("Booking failed! " + result.message);
      }
    } catch (error) {
      console.error("Booking error:", error);
      alert("An error occurred.");
    }
  };

  return (
    <div>
      <h2>Book Event</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Full Name" required onChange={handleChange} />
        <input type="email" name="email" placeholder="Email" required onChange={handleChange} />
        <input type="text" name="phone" placeholder="Phone Number" required onChange={handleChange} />
        <input type="number" name="tickets" placeholder="Number of Tickets" min="1" required onChange={handleChange} />
        <button type="submit">Book Now</button>
      </form>
    </div>
  );
};

export default BookNow;
