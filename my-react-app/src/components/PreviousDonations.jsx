import React, { useEffect, useState } from "react";
import axios from "axios";
import "./PreviousDonations.css";

const PreviousDonations = () => {
  const [donations, setDonations] = useState([]);

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:8080/agent/donations", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setDonations(response.data);
      } catch (error) {
        console.error("Error fetching donations:", error);
      }
    };

    fetchDonations();
  }, []);

  const renderDonationCards = () =>
    donations.map((donation) => (
      <div className="donation-card" key={donation._id}>
        <div className="card-title">{donation.name}</div>
        <div className="card-detail"><span className="card-label">Type:</span> {donation.typeOfFood}</div>
        <div className="card-detail"><span className="card-label">Quantity:</span> {donation.quantity}</div>
       
      </div>
    ));

  return (
    <div className="dashboard-content" style={{minHeight:"100vh"}}>
      <h2 className="dashboard-title">Previous Donations</h2>
      <div className="card-grid">
        {donations.length === 0 ? <p>No previous donations.</p> : renderDonationCards()}
      </div>
    </div>
  );
};

export default PreviousDonations;
