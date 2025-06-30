import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import "./EventForm.css";


const EventForm = () => {
  // State for form data
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    venue: "",
    city: "",
    genre: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: "", text: "" });

    try {
      const response = await axios.post("http://localhost:8080/admin/create-event", formData, {
        headers: { "Content-Type": "application/json" },
      });

      setMessage({ type: "success", text: response.data.message || "Event created successfully!" });
      setFormData({ title: "", description: "", date: "", time: "", venue: "", city: "", genre: "" });
    } catch (error) {
      setMessage({ type: "error", text: error.response?.data?.error || "Failed to create event!" });
    }

    setLoading(false);
  };

  return (
    <motion.div
      className="max-w-2xl mx-auto p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg mt-10 transition-all"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
    >
      <h2 className="text-2xl font-bold mb-5 text-center dark:text-white">Create Event</h2>

      {message.text && (
        <motion.div
          className={`p-3 mb-4 rounded-lg ${message.type === "success" ? "bg-green-500" : "bg-red-500"} text-white text-center`}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {message.text}
        </motion.div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <input type="text" name="title" placeholder="Event Title" value={formData.title} onChange={handleChange} className="input-style" required />
          <input type="text" name="venue" placeholder="Venue" value={formData.venue} onChange={handleChange} className="input-style" required />
        </div>

        <textarea name="description" placeholder="Event Description" value={formData.description} onChange={handleChange} className="input-style" rows="3" required></textarea>

        <div className="grid grid-cols-2 gap-4">
          <input type="text" name="date" placeholder="DD-MM-YYYY" value={formData.date} onChange={handleChange} className="input-style" required />
          <input type="text" name="time" placeholder="HH:MM" value={formData.time} onChange={handleChange} className="input-style" required />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <input type="text" name="city" placeholder="City" value={formData.city} onChange={handleChange} className="input-style" required />
          <input type="text" name="genre" placeholder="Genre" value={formData.genre} onChange={handleChange} className="input-style" required />
        </div>

        <motion.button
          type="submit"
          className="submit-btn"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          disabled={loading}
        >
          {loading ? "Creating Event..." : "Create Event"}
        </motion.button>
      </form>
    </motion.div>
  );
};

export default EventForm;
