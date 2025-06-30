import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import Events from "./components/Events";
import Login from "./components/Login";
import Signup from "./components/SignupForm";
import BookNow from "./components/BookNow";
import AboutUs from "./components/AboutUs";
import AdminLogin from "./components/AdminLogin";
import AllBookings from "./components/AllBookings";
import EventForm from "./components/EventForm";
import MyBookings from "./components/MyBookings";

function App() {
  return (
    <>
    <Header />
<div className="main-content">
  <Routes>
  <Route path="/" element={<Home />} />
        <Route path="/events" element={<Events />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/book/:eventId" element={<BookNow />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/adminLogin" element={<AdminLogin />} />
        <Route path="/create-event" element={<EventForm />} />
        <Route path="/all-bookings" element={<AllBookings />} />
        <Route path="/my-bookings" element={<MyBookings/>} />

  </Routes>
</div>

    </>
  );
}

export default App;
