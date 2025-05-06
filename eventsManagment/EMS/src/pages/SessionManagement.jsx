// SessionManagement.js
// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import "../components/ExhibitorDashboard.css";
export const SessionManagement = ({ exhibitorId, eventId }) => {
  const [sessions, setSessions] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    timeSlot: "",
    speaker: "",
    location: "",
    imgUrl:"",
  });

  useEffect(() => {
    if (!exhibitorId || !eventId) {
      console.error("No exhibitorId or eventId provided");
      return;
    }

    const fetchSessions = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/api/sessions/event/${eventId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setSessions(response.data.data);
      } catch (error) {
        console.error("Error fetching sessions:", error);
      }
    };

    fetchSessions();
  }, [exhibitorId, eventId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:5001/api/sessions`, {
        ...formData,
    
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setSessions((prevSessions) => [...prevSessions, response.data.data]);
      setFormData({ title: "", timeSlot: "", speaker: "", location: "" });
      alert("Session added successfully!");
    } catch (error) {
      console.error("Error adding session:", error);
      alert("Failed to add session. Please try again.");
    }
  };

  return (
    <div className="session-management">
      <div className="session-header">
        <h3>Manage Event Sessions</h3>
        <p>Add and manage your event schedule</p>
      </div>

      <form onSubmit={handleSubmit} className="session-form">
        <div className="form-grid">
          <div className="form-group">
            <label>Session Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Enter session name"
              required
            />
          </div>

          <div className="form-group">
            <label>Time Slot</label>
            <input
              type="datetime-local"
              value={formData.timeSlot}
              onChange={(e) => setFormData({ ...formData, timeSlot: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label>Speaker</label>
            <input
              type="text"
              value={formData.speaker}
              onChange={(e) => setFormData({ ...formData, speaker: e.target.value })}
              placeholder="Enter speaker name"
              required
            />
          </div>

          <div className="form-group">
            <label>Location</label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              placeholder="Enter session location"
              required
            />
          </div>
          
          <div className="form-group">
            <label>imgUrl</label>
            <input
              type="url"
              value={formData.imgUrl}
              onChange={(e) => setFormData({ ...formData, imgUrl: e.target.value })}
              placeholder="Enter session imgUrl"
              required
            />
          </div>
          
        </div>

        <button type="submit" className="submit-button">
          + Add Session
        </button>
      </form>

      <div className="session-list">
        <h4>Scheduled Sessions</h4>
        {sessions.length > 0 ? (
          sessions.map((session) => (
            <div key={session._id} className="session-card">
              <div className="session-time">
                {new Date(session.timeSlot).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </div>
              <div className="session-details">
                <h5>{session.title}</h5>
                <div className="session-meta">
                  <span className="speaker">🎤 {session.speaker}</span>
                  <span className="location">📍 {session.location}</span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="empty-sessions">
            <p>No sessions scheduled yet</p>
          </div>
        )}
      </div>
    </div>
  );
};

// Define prop types for the component
SessionManagement.propTypes = {
  exhibitorId: PropTypes.string.isRequired,
  eventId: PropTypes.string.isRequired, // Add eventId prop type
};