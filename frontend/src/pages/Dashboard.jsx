import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import EventCard from "../components/EventCard";
import "./dashboard.css";

const Dashboard = () => {
  const [events, setEvents] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: "", date: "" });

  const addEvent = (e) => {
    e.preventDefault();
    setEvents([...events, { ...form, id: Date.now(), status: "Upcoming" }]);
    setForm({ title: "", date: "" });
    setShowForm(false);
  };

  return (
    <div className="dashboard-container">
      <h2>Dashboard</h2>
      <p>Total Events: {events.length}</p>

      <button className="add-btn" onClick={() => setShowForm(!showForm)}>
        + Create Event
      </button>

      <AnimatePresence>
        {showForm && (
          <motion.form
            onSubmit={addEvent}
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            className="event-form"
          >
            <input
              type="text"
              placeholder="Event title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              required
            />
            <input
              type="date"
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
              required
            />
            <button type="submit">Add</button>
          </motion.form>
        )}
      </AnimatePresence>

      <div className="event-grid">
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
