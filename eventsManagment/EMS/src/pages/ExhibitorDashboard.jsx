// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import axios from "axios";
import { SessionManagement } from "./SessionManagement";
import "../components/ExhibitorDashboard.css";
export const ExhibitorDashboard = () => {
  const [exhibitor, setExhibitor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [publishing, setPublishing] = useState(false);
  const [published, setPublished] = useState(false);
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    const fetchExhibitorData = async () => {
      try {
        const response = await axios.get("http://localhost:5001/api/exhibitors/me", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setExhibitor(response.data.data);
        setPublished(response.data.data.isPublished);
      } catch (error) {
        console.error("Error fetching exhibitor data:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchSessions = async () => {
      try {
        const response = await axios.get("http://localhost:5001/api/sessions/exhibitor", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setSessions(response.data.sessions);
      } catch (error) {
        console.error("Error fetching sessions:", error);
      }
    };

    fetchExhibitorData();
    fetchSessions();
  }, []);

  const handlePublish = async () => {
    setPublishing(true);
    try {
      await axios.post("http://localhost:5001/api/exhibitors/publish", {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setPublished(true);
    } catch (error) {
      console.error("Error publishing event:", error);
    } finally {
      setPublishing(false);
    }
  };

  if (loading) return (
    <div className="loading-container">
      <div className="loading-spinner"></div>
    </div>
  );

  if (!exhibitor) return <div className="no-exhibitor">No exhibitor registration found.</div>;

  if (exhibitor.status === "pending") {
    return (
      <div className="pending-approval">
        <div className="pending-content">
          <h2>Application Under Review</h2>
          <p>Your submission is being reviewed by our team. You&apos;ll receive notification once approved.</p>
          <div className="status-icon">🕒</div>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Exhibitor Dashboard</h1>
        <div className="event-info">
          <span className="event-name">{exhibitor.eventName}</span>
          <span className="booth-number">Booth #{exhibitor.boothNumber}</span>
        </div>
      </header>

      <div className="dashboard-content">
        <section className="company-info">
          <h3>Company Details</h3>
          <div className="info-grid">
            <div className="info-item">
              <span className="info-label">Company Name</span>
              <span className="info-value">{exhibitor.companyName}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Contact Person</span>
              <span className="info-value">{exhibitor.contactPerson}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Products/Services</span>
              <span className="info-value">{exhibitor.productsServices}</span>
            </div>
          </div>
        
        </section>

        <section className="publish-section">
          {exhibitor.status === "approved" && !published && (
            <>
              <button 
                onClick={handlePublish} 
                className={`publish-button ${publishing ? 'publishing' : ''} ${sessions.length === 0 ? 'disabled' : ''}`}
                disabled={publishing || sessions.length === 0}
              >
                {publishing ? (
                  <>
                    <span className="button-spinner"></span>
                    Publishing...
                  </>
                ) : (
                  "Publish Event"
                )}
              </button>
              {sessions.length === 0 && (
                <div className="alert warning">
                  ⚠️ You must add at least one session before publishing
                </div>
              )}
            </>
          )}

          {published && (
            <div className="alert success">
              ✅ Your event is now published and visible to attendees!
            </div>
          )}
        </section>

        {exhibitor.status === "approved" && (
          <section className="session-management">
            <h3>Session Management</h3>
            <SessionManagement 
              exhibitorId={exhibitor._id} 
              eventId={exhibitor.eventId} 
            />
          </section>
        )}
      </div>
    </div>
  );
};