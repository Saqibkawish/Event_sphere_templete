// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import axios from "axios";
import "../components/ExhibitorDashboard.css";
export const ExhibitorSearch = () => {
  const [exhibitors, setExhibitors] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchExhibitors = async () => {
      try {
        const response = await axios.get("http://localhost:5001/api/exhibitors");
        setExhibitors(response.data.data);
      } catch (error) {
        console.error("Error fetching exhibitors:", error);
      }
    };
    fetchExhibitors();
  }, []);

  const filteredExhibitors = exhibitors.filter((exhibitor) =>
    exhibitor.companyName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="exhibitor-search-container">
      <header className="search-header">
        <h1>Exhibitor Directory</h1>
        <p>Discover companies participating in our events</p>
      </header>

      <div className="search-bar">
        <div className="search-input-container">
          <svg className="search-icon" viewBox="0 0 24 24">
            <path d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 0 0 1.48-5.34c-.47-2.78-2.79-5-5.59-5.34a6.505 6.505 0 0 0-7.27 7.27c.34 2.8 2.56 5.12 5.34 5.59a6.5 6.5 0 0 0 5.34-1.48l.27.28v.79l4.25 4.25c.41.41 1.08.41 1.49 0 .41-.41.41-1.08 0-1.49L15.5 14zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
          </svg>
          <input
            type="text"
            placeholder="Search by company name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
      </div>

      <div className="exhibitor-grid">
        {filteredExhibitors.length > 0 ? (
          filteredExhibitors.map((exhibitor) => (
            <div key={exhibitor._id} className="exhibitor-card">
              <div className="card-header">
                <h3 className="company-name">{exhibitor.companyName}</h3>
                {exhibitor.boothNumber && (
                  <span className="booth-badge">Booth #{exhibitor.boothNumber}</span>
                )}
              </div>
              <div className="products-services">
    {exhibitor.productsServices}
  </div>
              <div className="company-meta">
                {exhibitor.contactPerson && (
                  <div className="meta-item">
                    <span className="meta-label">Contact</span>
                    <span className="meta-value">{exhibitor.contactPerson}</span>
                  </div>
                )}
                {exhibitor.email && (
                  <div className="meta-item">
                    <span className="meta-label">Email</span>
                    <span className="meta-value">{exhibitor.email}</span>
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="empty-state">
            <svg className="empty-icon" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
            </svg>
            <p>No exhibitors found matching your search</p>
          </div>
        )}
      </div>
    </div>
  );
};