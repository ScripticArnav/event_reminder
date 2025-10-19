import React, { useState, useEffect } from "react";
import EventCard from "../components/EventCard";
import { useAuth } from "../context/AuthContext";
import "./dashboard.css";

const Dashboard = () => {
  const [events, setEvents] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: "", date: "", description: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { user } = useAuth();

  // Load events on component mount
  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = () => {
    try {
      console.log("Loading events from localStorage...");
      const localEvents = localStorage.getItem('events');
      if (localEvents) {
        setEvents(JSON.parse(localEvents));
        console.log("Events loaded from localStorage:", JSON.parse(localEvents));
      } else {
        setEvents([]);
        console.log("No events found in localStorage");
      }
    } catch (error) {
      console.error("Error loading from localStorage:", error);
      setEvents([]);
      setError("Error loading events");
    }
  };

  const addEvent = (e) => {
    e.preventDefault();
    console.log("Adding event:", form);
    
    try {
      setError("");
      
      // Create new event
      const newEvent = {
        _id: Date.now().toString(),
        title: form.title,
        date: form.date,
        description: form.description || "",
        createdAt: new Date().toISOString()
      };
      
      // Add to events array
      const updatedEvents = [...events, newEvent];
      setEvents(updatedEvents);
      
      // Save to localStorage
      localStorage.setItem('events', JSON.stringify(updatedEvents));
      
      // Trigger storage event for home page updates
      window.dispatchEvent(new Event('storage'));
      
      // Reset form
      setForm({ title: "", date: "", description: "" });
      setShowForm(false);
      
      console.log("Event added successfully:", newEvent);
    } catch (error) {
      console.error("Error adding event:", error);
      setError("Failed to add event");
    }
  };

  const deleteEvent = (id) => {
    try {
      console.log("Deleting event:", id);
      const updatedEvents = events.filter(event => event._id !== id);
      setEvents(updatedEvents);
      localStorage.setItem('events', JSON.stringify(updatedEvents));
      
      // Trigger storage event for home page updates
      window.dispatchEvent(new Event('storage'));
      
      console.log("Event deleted successfully");
    } catch (error) {
      console.error("Error deleting event:", error);
      setError("Failed to delete event");
    }
  };

  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <div>
          <h2>Dashboard</h2>
          <p className="muted">Welcome, {user?.name || user?.email || 'User'}</p>
        </div>
        <div className="stats-pill">Total events: {events.length}</div>
      </div>

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      <div className="card">
        <button className="primary-btn" onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Close' : '+ Create Event'}
        </button>

        {showForm && (
          <form onSubmit={addEvent} className="event-form">
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
            <textarea
              placeholder="Event description (optional)"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              rows="3"
            />
            <button type="submit" className="secondary-btn">Add Event</button>
          </form>
        )}
      </div>

      <div className="card">
        <div className="card-header">
          <h3>Your Events</h3>
          <span className="muted">Recently added appear first</span>
        </div>
        <div className="event-grid">
          {events.length > 0 ? (
            events
              .slice()
              .reverse()
              .map((event) => (
                <EventCard 
                  key={event._id} 
                  event={event} 
                  onDelete={deleteEvent}
                />
              ))
          ) : (
            <p className="muted">No events yet. Create your first event!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
