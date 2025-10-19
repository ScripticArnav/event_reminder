import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import EventCard from "../components/EventCard";
import { motion } from "framer-motion";
import { eventsAPI } from "../utils/api";
import "./home.css";

const Home = () => {
  const [time, setTime] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Load events: prefer backend if logged in, otherwise fallback to localStorage
  useEffect(() => {
    const load = async () => {
      await loadEvents();
    };
    load();
    
    const handleStorageChange = () => {
      loadEvents();
    };
    window.addEventListener('storage', handleStorageChange);
    
    const interval = setInterval(loadEvents, 4000);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  const loadEvents = async () => {
    try {
      const token = localStorage.getItem('token');
      let sourceEvents = [];
      if (token) {
        try {
          const data = await eventsAPI.getEvents();
          sourceEvents = Array.isArray(data) ? data : [];
        } catch (e) {
          // If API fails, fall back to localStorage silently
          const localEvents = localStorage.getItem('events');
          sourceEvents = localEvents ? JSON.parse(localEvents) : [];
        }
      } else {
        const localEvents = localStorage.getItem('events');
        sourceEvents = localEvents ? JSON.parse(localEvents) : [];
      }

      setEvents(sourceEvents);

      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const upcoming = sourceEvents
        .filter((event) => {
          const eventDate = new Date(event.date);
          eventDate.setHours(0, 0, 0, 0);
          return eventDate >= today;
        })
        .sort((a, b) => new Date(a.date) - new Date(b.date));
      setUpcomingEvents(upcoming.slice(0, 6));
    } catch (error) {
      console.error("Error loading events:", error);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  return (
    <div className="home-container">
      {/* Hero Section */}
      <motion.section 
        className="hero-section"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="hero-content" variants={itemVariants}>
          <motion.h1 
            className="hero-title"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            📅 Event Reminder
            <span className="gradient-text"> Pro</span>
          </motion.h1>
          
          <motion.p 
            className="hero-subtitle"
            variants={itemVariants}
          >
            Never miss an important event again. Stay organized, stay ahead.
          </motion.p>

          <motion.div 
            className="hero-buttons"
            variants={itemVariants}
          >
            <Link to="/signup" className="btn btn-primary">
              Get Started Free
            </Link>
            <Link to="/login" className="btn btn-secondary">
              Sign In
            </Link>
          </motion.div>
        </motion.div>

        <motion.div 
          className="hero-visual"
          variants={itemVariants}
        >
          <div className="floating-cards">
            <div className="card card-1">📅</div>
            <div className="card card-2">⏰</div>
            <div className="card card-3">📱</div>
          </div>
        </motion.div>
      </motion.section>

      {/* Features Section */}
      <motion.section 
        className="features-section"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="container">
          <h2 className="section-title">Why Choose Event Reminder Pro?</h2>
          <div className="features-grid">
            <motion.div 
              className="feature-card"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <div className="feature-icon">🚀</div>
              <h3>Smart Notifications</h3>
              <p>Get timely reminders via email, SMS, and push notifications</p>
            </motion.div>
            
            <motion.div 
              className="feature-card"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <div className="feature-icon">📊</div>
              <h3>Analytics Dashboard</h3>
              <p>Track your productivity and event completion rates</p>
            </motion.div>
            
            <motion.div 
              className="feature-card"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <div className="feature-icon">🔒</div>
              <h3>Secure & Private</h3>
              <p>Your data is encrypted and never shared with third parties</p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Live Dashboard Preview */}
      <motion.section 
        className="dashboard-preview"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="container">
          <h2 className="section-title">Live Dashboard</h2>
          
          <div className="dashboard-widgets">
            <motion.div 
              className="widget time-widget"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <div className="widget-icon">🕒</div>
              <div className="widget-content">
                <h3>Current Time</h3>
                <p className="time-display">{time.toLocaleTimeString()}</p>
                <p className="date-display">{time.toLocaleDateString()}</p>
              </div>
            </motion.div>

            <motion.div 
              className="widget weather-widget"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <div className="widget-icon">☀️</div>
              <div className="widget-content">
                <h3>Weather</h3>
                <p className="weather-temp">28°C</p>
                <p className="weather-desc">Sunny</p>
              </div>
            </motion.div>

            <motion.div 
              className="widget events-widget"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <div className="widget-icon">📅</div>
              <div className="widget-content">
                <h3>Upcoming Events</h3>
                <p className="events-count">{upcomingEvents.length}</p>
                <p className="events-desc">Next events</p>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Events Preview */}
      <motion.section 
        className="events-section"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="container">
          <h2 className="section-title">Upcoming Events</h2>
          {upcomingEvents.length > 0 ? (
            <motion.div
              className="event-grid"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              viewport={{ once: true }}
            >
              {upcomingEvents.map((event, index) => (
                <motion.div
                  key={event._id || event.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <EventCard event={event} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              className="no-events-message"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              viewport={{ once: true }}
            >
              <div className="no-events-card">
                <div className="no-events-icon">📅</div>
                <h3>No upcoming events</h3>
                <p>Create your first event to get started!</p>
              </div>
            </motion.div>
          )}
          
          <motion.div 
            className="cta-section"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            viewport={{ once: true }}
          >
            <Link to="/dashboard" className="btn btn-primary btn-large">
              {upcomingEvents.length > 0 ? "View All Events" : "Create Your First Event"}
            </Link>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default Home;
