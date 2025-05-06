// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import axios from "axios";
import "../components/AdminDashboard.css";
export const AdminDashboard = () => {
  const [exhibitors, setExhibitors] = useState([]);
  const [availableBooths, setAvailableBooths] = useState([]);
  const [boothSelections, setBoothSelections] = useState({});
  const [statusSelections, setStatusSelections] = useState({});

  useEffect(() => {
    const fetchExhibitors = async () => {
      try {
        const response = await axios.get("http://localhost:5001/api/exhibitors", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setExhibitors(response.data.data);
      } catch (error) {
        console.error("Error fetching exhibitors:", error);
      }
    };
    fetchExhibitors();
  }, []);

  useEffect(() => {
    const fetchAvailableBooths = async () => {
      try {
        const response = await axios.get("http://localhost:5001/api/exhibitors/available-booths", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setAvailableBooths(response.data.data);
      } catch (error) {
        console.error("Error fetching booths:", error);
      }
    };
    fetchAvailableBooths();
  }, []);

  const handleBoothAssignment = async (exhibitorId) => {
    const selectedBooth = boothSelections[exhibitorId];
    if (!selectedBooth) {
      alert("Please select a booth first.");
      return;
    }

    try {
      await axios.put(
        `http://localhost:5001/api/exhibitors/${exhibitorId}/assign-booth`,
        { boothNumber: selectedBooth },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      // Update the exhibitor's booth number in the state
      setExhibitors((prevExhibitors) =>
        prevExhibitors.map((exhibitor) =>
          exhibitor._id === exhibitorId
            ? { ...exhibitor, boothNumber: selectedBooth }
            : exhibitor
        )
      );

      // Remove assigned booth from availableBooths list
      setAvailableBooths((prevBooths) => prevBooths.filter((booth) => booth !== selectedBooth));

      alert("Booth assigned successfully!");
    } catch (error) {
      console.error("Error assigning booth:", error);
      alert("Failed to assign booth. Please try again.");
    }
  };

  const handleStatusUpdate = async (exhibitorId) => {
    const selectedStatus = statusSelections[exhibitorId];
    if (!selectedStatus) {
      alert("Please select a status first.");
      return;
    }
  
    try {
      // Make API call to update status in the database
      await axios.put(
        `http://localhost:5001/api/exhibitors/${exhibitorId}/status`,
        { status: selectedStatus },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
  
      // Update the exhibitor's status in the state
      setExhibitors((prevExhibitors) =>
        prevExhibitors.map((exhibitor) =>
          exhibitor._id === exhibitorId
            ? { ...exhibitor, status: selectedStatus }
            : exhibitor
        )
      );
  
      alert("Status updated successfully!");
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Failed to update status. Please try again.");
    }
  };

  return (
    <div className="admin-dashboard">
      <header className="dashboard-header">
        <h1>Exhibitor Management</h1>
        <p>Manage exhibitor registrations and booth assignments</p>
      </header>

      <div className="dashboard-content">
        <div className="exhibitor-table-container">
          <table className="exhibitor-table">
            <thead>
              <tr>
                <th>Company</th>
                <th>Contact</th>
                <th>Event</th>
                <th>Status</th>
                <th>Booth</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {exhibitors.length > 0 ? (
                exhibitors.map((exhibitor) => (
                  <tr key={exhibitor._id}>
                    <td>
                      <div className="company-info">
                        <div className="company-name">{exhibitor.companyName}</div>
                        <div className="company-email">{exhibitor.email}</div>
                      </div>
                    </td>
                    <td>
                      <div className="contact-info">
                        <div className="contact-person">{exhibitor.contactPerson}</div>
                        <div className="contact-phone">{exhibitor.phone}</div>
                      </div>
                    </td>
                    <td className="event-name">{exhibitor.eventName}</td>
                    <td>
                      <span className={`status-badge ${exhibitor.status}`}>
                        {exhibitor.status}
                      </span>
                    </td>
                    <td>
                      {exhibitor.boothNumber ? (
                        <span className="booth-badge">#{exhibitor.boothNumber}</span>
                      ) : (
                        <span className="booth-unassigned">Unassigned</span>
                      )}
                    </td>
                    <td>
                      <div className="action-group">
                        <div className="assignment-control">
                          <select
                            className="booth-select"
                            value={boothSelections[exhibitor._id] || ""}
                            onChange={(e) =>
                              setBoothSelections((prev) => ({
                                ...prev,
                                [exhibitor._id]: e.target.value,
                              }))
                            }
                          >
                            <option value="">Select Booth</option>
                            {availableBooths.map((booth) => (
                              <option key={booth} value={booth}>
                                Booth {booth}
                              </option>
                            ))}
                          </select>
                          <button
                            className="btn-assign"
                            onClick={() => handleBoothAssignment(exhibitor._id)}
                          >
                            Assign
                          </button>
                        </div>

                        <div className="status-control">
                          <select
                            className="status-select"
                            value={statusSelections[exhibitor._id] || ""}
                            onChange={(e) =>
                              setStatusSelections((prev) => ({
                                ...prev,
                                [exhibitor._id]: e.target.value,
                              }))
                            }
                          >
                            <option value="">Update Status</option>
                            <option value="approved">Approved</option>
                            <option value="rejected">Rejected</option>
                            <option value="pending">Pending</option>
                          </select>
                          <button
                            className="btn-update"
                            onClick={() => handleStatusUpdate(exhibitor._id)}
                          >
                            Update
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="empty-state">
                    <div className="empty-content">
                      <img src="/images/empty-exhibitors.svg" alt="No exhibitors" />
                      <p>No exhibitors found</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};