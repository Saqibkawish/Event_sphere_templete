// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import axios from "axios";
import "../components/ExhibitorRegistration.css";
export const ExhibitorRegistration = () => {
  const [formData, setFormData] = useState({
    companyName: "",
    contactPerson: "",
    email: "",
    phone: "",
    productsServices: "",
    _id: "", // Ensure this is included
    documents: [],
  });

  const [events, setEvents] = useState([]); // State to store events

  // Fetch events from the server
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get("http://localhost:5001/api/events/events");
        setEvents(response.data.data); // Assuming the response contains an array of events
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };
    fetchEvents();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const selectedEvent = events.find(event => event._id === formData._id);
    if (!selectedEvent) {
      alert("Please select a valid event.");
      return;
    }
  
    try {
      const response = await axios.post("http://localhost:5001/api/exhibitors/register", {
        ...formData,
        eventId: formData._id,  // ✅ Send eventId explicitly
        eventName: selectedEvent.eventName, // ✅ Send eventName
      });
  
      alert("Registration successful!");
      console.log(response.data);
    } catch (error) {
      alert("Registration failed. Please try again.");
      console.error("Registration error:", error.response?.data || error);
    }
  };
  
  

  return (
    <div className="registration-container">
      <div className="registration-card">
        <header className="registration-header">
          <h2>Exhibitor Registration</h2>
          <p>Join upcoming events as an exhibitor</p>
        </header>

        <form onSubmit={handleSubmit} className="registration-form">
          <div className="form-grid">
            <div className="form-group">
              <label>Company Name</label>
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                placeholder="Enter company name"
                required
              />
            </div>

            <div className="form-group">
              <label>Contact Person</label>
              <input
                type="text"
                name="contactPerson"
                value={formData.contactPerson}
                onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                placeholder="Full name of contact person"
                required
              />
            </div>

            <div className="form-group">
              <label>Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="official@company.com"
                required
              />
            </div>

            <div className="form-group">
              <label>Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+1 234 567 890"
                required
              />
            </div>

            <div className="form-group full-width">
              <label>Products/Services</label>
              <textarea
                name="productsServices"
                value={formData.productsServices}
                onChange={(e) => setFormData({ ...formData, productsServices: e.target.value })}
                placeholder="Describe your offerings"
                rows="4"
                required
              />
            </div>

            <div className="form-group full-width">
              <label>Select Event</label>
              <select
                name="_id"
                value={formData._id}
                onChange={(e) => setFormData({ ...formData, _id: e.target.value })}
                required
              >
                <option value="">Choose an event...</option>
                {events.map((event) => (
                  <option key={event._id} value={event._id}>
                    {event.eventName} ({new Date(event.date).toLocaleDateString()})
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button type="submit" className="submit-button">
            Submit Application
          </button>
        </form>
      </div>
    </div>
  );
};