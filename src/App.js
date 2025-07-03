import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import Events from "./components/Events";
import Login from "./components/Login";
import Signup from "./components/SignupForm";
import BookNow from "./components/BookNow";
import AboutUs from "./components/AboutUs";
import AllBookings from "./components/AllBookings";
import EventForm from "./components/EventForm";
import MyBookings from "./components/MyBookings";
import AdminUsers from "./components/AdminUsers";

function App() {
  return (
    <div className="App">
      <Header />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/events" element={<Events />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/book/:eventId" element={<BookNow />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/create-event" element={<EventForm />} />
          <Route path="/all-bookings" element={<AllBookings />} />
          <Route path="/my-bookings" element={<MyBookings />} />
          <Route path="/admin/users" element={<AdminUsers />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
