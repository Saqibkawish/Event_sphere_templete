// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import axios from "axios";
import "../components/PublicEvents.css"; // Create this CSS file
import RegistrationForm from "../components/RegistrationForm";
export const PublicEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState(null);
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get("http://localhost:5001/api/events/published");
        setEvents(response.data.data);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  if (loading) {
    return <div className="loading-spinner"></div>;
  }

  return (
    <div className="events-container">
      <header className="events-header">
        <h1>Upcoming Expos & Trade Shows</h1>
        <p>Explore upcoming industry events and their participants</p>
      </header>

      <div className="events-grid">
        {events.length > 0 ? (
          events.map((event) => (
            <article key={event._id} className="event-card">
              <div className="card-image">
                <img src={event.imageUrl} alt={event.eventName} />
                <div className="event-badge">{event.category}</div>
              </div>
              
              <div className="card-content">
      <div className="event-meta">
        <span className="event-date">📅 {event.date}</span>
        <span className="event-location">📍 {event.location}</span>
      </div>

      <h2>{event.eventName}</h2>
      <p className="event-description">{event.description}</p>
                
                <div className="organizer-info">
                  <span className="organizer-label">Organized by:</span>
                  <span className="organizer-name">{event.organizer}</span>
                </div>
                <button className="register-btn" onClick={() => setSelectedEvent(event._id)}>
                  Register
                </button>
                {event.exhibitors?.length > 0 && (
                  <div className="exhibitors-section">
                    <h3>Featured Exhibitors</h3>
                    {event.exhibitors.map((exhibitor) => (
                      <div key={exhibitor._id} className="exhibitor-card">
                        <div className="exhibitor-header">
                          <h4>{exhibitor.companyName}</h4>
                          {exhibitor.boothNumber && (
                            <span className="booth-number">Booth #{exhibitor.boothNumber}</span>
                          )}
                        </div>
                        
                        <div className="exhibitor-contacts">
                          <p>👤 {exhibitor.contactPerson}</p>
                          <p>📞 {exhibitor.phone}</p>
                        </div>

                        {exhibitor.productsServices && (
                          <div className="exhibitor-products">
                            <strong>Specialties:</strong>
                            <p>{exhibitor.productsServices}</p>
                          </div>
                        )}

                        {exhibitor.documents?.length > 0 && (
                          <div className="exhibitor-documents">
                            <strong>Resources:</strong>
                            <div className="document-list">
                              {exhibitor.documents.map((doc, index) => (
                                <a key={index} href={doc} className="document-link" target="_blank" rel="noopener noreferrer">
                                  📄 Document {index + 1}
                                </a>
                              ))}
                            </div>
                          </div>
                        )}

                        {exhibitor.sessions?.length > 0 && (
                          <div className="exhibitor-sessions">
                            <strong>Scheduled Sessions:</strong>
                            {exhibitor.sessions.map((session) => (
                              <div key={session._id} className="session-item">
                                <div className="session-time">
                                  ⏰ {session.timeSlot}
                                </div>
                                <div className="session-details">
                                  <h5>{session.title}</h5>
                                  <p>Speaker: {session.speaker}</p>
                                  <p>Location: {session.location}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </article>
          ))
        ) : (
          <div className="empty-state">
            <img src="/images/empty-events.svg" alt="No events found" />
            <h3>No Current Events Available</h3>
            <p>Check back later for upcoming expos and trade shows</p>
          </div>
        )}
      </div>
      {selectedEvent && (
        <RegistrationForm eventId={selectedEvent} onClose={() => setSelectedEvent(null)} />
      )}
    </div>
  );
};