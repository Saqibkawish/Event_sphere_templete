// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import axios from "axios";
import "../components/AddEvent.css";
export const AddEvent = () => {
  const [formData, setFormData] = useState({
    eventName: "",
    description: "",
    date: "",
    location: "",
    organizer: "",
    imageUrl: "",
  });

  const [message, setMessage] = useState({ text: "", type: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5001/api/events/add-event",
        formData
      );
      setMessage({
        text: response.data.message,
        type: "success"
      });
      setFormData({
        eventName: "",
        description: "",
        date: "",
        location: "",
        organizer: "",
        imageUrl: "",
      });
    } catch (error) {
      setMessage({
        text: error.response?.data?.error || "Failed to add event",
        type: "error"
      });
    }
  };

  return (
    <div className="form-container">
      <div className="event-form-card">
        <h2 className="form-title">Create New Event</h2>
        
        {message.text && (
          <div className={`message-alert ${message.type}`}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="event-form">
          <div className="form-group">
            <label className="form-label">
              Event Name
              <input
                type="text"
                name="eventName"
                value={formData.eventName}
                onChange={handleChange}
                required
                className="form-input"
                placeholder="Enter event name"
              />
            </label>
          </div>

         

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">
                Date
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                  className="form-input"
                />
              </label>
            </div>

            <div className="form-group">
              <label className="form-label">
                Location
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  required
                  className="form-input"
                  placeholder="Enter venue location"
                />
              </label>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">
                Organizer
                <input
                  type="text"
                  name="organizer"
                  value={formData.organizer}
                  onChange={handleChange}
                  required
                  className="form-input"
                  placeholder="Organizer name"
                />
              </label>
            </div>

            <div className="form-group">
              <label className="form-label">
                Image URL
                <input
                  type="url"
                  name="imageUrl"
                  value={formData.imageUrl}
                  onChange={handleChange}
                  required
                  className="form-input"
                  placeholder="https://example.com/image.jpg"
                />
              </label>
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">
              Description
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                className="form-input textarea"
                placeholder="Describe the event"
                rows="4"
              />
            </label>
          </div>
          <div className="form-actions">
            <button type="submit" className="submit-button">
              <span className="button-icon">➕</span>
              Create Event
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEvent;