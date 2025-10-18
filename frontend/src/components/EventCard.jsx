import React from "react";
import { motion } from "framer-motion";
import "./eventcard.css";

const EventCard = ({ event }) => (
  <motion.div
    className="event-card"
    whileHover={{ scale: 1.05, y: -5 }}
    transition={{ duration: 0.3 }}
  >
    <div className="event-header">
      <div className="event-icon">📅</div>
      <span className={`status ${event.status.toLowerCase()}`}>{event.status}</span>
    </div>
    
    <div className="event-content">
      <h3>{event.title}</h3>
      {event.description && <p className="event-description">{event.description}</p>}
      
      <div className="event-details">
        <div className="event-date">
          <span className="detail-icon">📅</span>
          <span>{event.date}</span>
        </div>
        {event.time && (
          <div className="event-time">
            <span className="detail-icon">⏰</span>
            <span>{event.time}</span>
          </div>
        )}
      </div>
    </div>
  </motion.div>
);

export default EventCard;
