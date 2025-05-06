// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import axios from "axios";
import "../components/ManageEvents.css";

export const ManageEvents = () => {
  const [events, setEvents] = useState([]);
  const [editEvent, setEditEvent] = useState(null);
  const [formData, setFormData] = useState({
    eventName: "",
    description: "",
    date: "",
    location: "",
    organizer: "",
    imageUrl: "",
  });

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get("http://localhost:5001/api/events/events");
        console.log("API Response:", response.data); // Debugging
  
        if (response.data && Array.isArray(response.data.data)) {
          setEvents(response.data.data); // Extract 'data' array from response
        } else {
          console.error("Invalid API response format:", response.data);
          setEvents([]); // Prevent errors
        }
      } catch (error) {
        console.error("Error fetching events:", error);
        setEvents([]);
      }
    };
  
    fetchEvents();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUpdateEvent = async (id) => {
    try {
      await axios.put(`http://localhost:5001/api/events/update-event/${id}`, formData);
      alert("Event updated successfully");
      const response = await axios.get("http://localhost:5001/api/events/events");
      setEvents(response.data.data);
      setEditEvent(null);
    } catch (error) {
      console.error("Error updating event:", error);
    }
  };

  const handleDeleteEvent = async (id) => {
    try {
      await axios.delete(`http://localhost:5001/api/events/delete-event/${id}`);
      alert("Event deleted successfully");
      const response = await axios.get("http://localhost:5001/api/events/events");
      setEvents(response.data.data);
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  const handleEditClick = (event) => {
    setEditEvent(event._id);
    setFormData({
      eventName: event.eventName,
      description: event.description,
      date: event.date,
      location: event.location,
      organizer: event.organizer,
      imageUrl: event.imageUrl,
    });
  };

  const handleModalClose = () => {
    setEditEvent(null);
    setFormData({
      eventName: "",
      description: "",
      date: "",
      location: "",
      organizer: "",
      imageUrl: "",
    });
  };

  return (
    <div className="manage-events-container">
      <header className="management-header">
        <h1>Manage Events</h1>
        <p>View and manage all scheduled events</p>
      </header>

      {events.length === 0 ? (
        <div className="empty-state">
          <img src="/images/no-events.svg" alt="No events" />
          <p>No events available at the moment</p>
        </div>
      ) : (
        <div className="events-grid">
          {events.map((event) => (
            <div key={event._id} className="event-card">
              <div className="card-header">
                <img src={event.imageUrl} alt={event.eventName} className="event-image" />
                <div className="event-meta">
                  <span className="event-date">
                    {new Date(event.date).toLocaleDateString('en-US', { 
                      weekday: 'short', 
                      month: 'short', 
                      day: 'numeric' 
                    })}
                  </span>
                  <span className="event-location">📍 {event.location}</span>
                </div>
              </div>
              
              <div className="card-content">
                <h3 className="event-title">{event.eventName}</h3>
                <p className="event-description">{event.description}</p>
                <div className="organizer-info">
                  <span className="organizer-label">Organized by:</span>
                  <span className="organizer-name">{event.organizer}</span>
                </div>
              </div>

              <div className="card-actions">
                <button 
                  className="btn-edit"
                  onClick={() => handleEditClick(event)}
                >
                  ✏️ Edit
                </button>
                <button 
                  className="btn-delete"
                  onClick={() => handleDeleteEvent(event._id)}
                >
                  🗑 Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {editEvent && (
        <div className="edit-modal-overlay">
        <div className="edit-modal-content">
          <h3>Edit Event</h3>
          <form onSubmit={(e) => {
            e.preventDefault();
            handleUpdateEvent(editEvent);
          }}>
            <label htmlFor="eventName">Event Name</label>
            <input type="text" id="eventName" name="eventName" value={formData.eventName} onChange={handleInputChange} placeholder="Event Name" required />
      
            <label htmlFor="description">Description</label>
            <textarea id="description" name="description" value={formData.description} onChange={handleInputChange} placeholder="Description" required></textarea>
      
            <label htmlFor="date">Date</label>
            <input type="date" id="date" name="date" value={formData.date} onChange={handleInputChange} required />
      
            <label htmlFor="location">Location</label>
            <input type="text" id="location" name="location" value={formData.location} onChange={handleInputChange} placeholder="Location" required />
      
            <label htmlFor="organizer">Organizer</label>
            <input type="text" id="organizer" name="organizer" value={formData.organizer} onChange={handleInputChange} placeholder="Organizer" required />
      
            <label htmlFor="imageUrl">Image URL</label>
            <input type="text" id="imageUrl" name="imageUrl" value={formData.imageUrl} onChange={handleInputChange} placeholder="Image URL" required />
      
            <div className="modal-actions">
              <button type="submit" className="btn-save">
                Save
              </button>
              <button 
                type="button" 
                className="btn-cancel"
                onClick={handleModalClose}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
      
      )}
    </div>
  );
};
