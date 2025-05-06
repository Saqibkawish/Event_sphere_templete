// ExhibitorList.js
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";

export const ExhibitorList = ({ exhibitorId }) => {
  const [exhibitors, setExhibitors] = useState([]);

  useEffect(() => {
    const fetchExhibitors = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/api/exhibitors/${exhibitorId}`);
        setExhibitors(response.data.data);
      } catch (error) {
        console.error("Error fetching exhibitors:", error);
      }
    };
    fetchExhibitors();
  }, [exhibitorId]);

  return (
    <div>
      <h4>Exhibitors</h4>
      {exhibitors.length > 0 ? (
        <ul>
          {exhibitors.map((exhibitor) => (
            <li key={exhibitor._id}>
              {exhibitor.companyName} - {exhibitor.status}
            </li>
          ))}
        </ul>
      ) : (
        <p>No exhibitors found for this event.</p>
      )}
    </div>
  );
};

// Define prop types for the component
ExhibitorList.propTypes = {
    exhibitorId: PropTypes.string.isRequired,
};