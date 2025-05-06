// SessionList.js
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";

export const SessionList = ({ eventId }) => {
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/api/sessions/${eventId}`);
        setSessions(response.data.data);
      } catch (error) {
        console.error("Error fetching sessions:", error);
      }
    };
    fetchSessions();
  }, [eventId]);

  return (
    <div>
      <h4>Sessions</h4>
      {sessions.length > 0 ? (
        <ul>
          {sessions.map((session) => (
            <li key={session._id}>
              {session.title} - {session.timeSlot} - {session.speaker}
            </li>
          ))}
        </ul>
      ) : (
        <p>No sessions found for this event.</p>
      )}
    </div>
  );
};

// Define prop types for the component
SessionList.propTypes = {
  eventId: PropTypes.string.isRequired,
};