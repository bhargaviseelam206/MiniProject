import React, { useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import axios from 'axios';  // Ensure axios is imported
import "./ODonate.css";

const DonationForm = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [donationType, setDonationType] = useState('');
  const [quantity, setQuantity] = useState('');
  const [message, setMessage] = useState('');
  const location = useLocation();
  const orphanageName = location.state?.orphanageName || "Unknown";  // Get orphanage name from location.state

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = {
        donorName: name,         
        donationType,            
        quantity,                
        message,                
        orphanageName,                          
      };
      console.log(formData)
      await axios.post('http://localhost:8080/donations', formData);
// Send data to backend

      alert("Donation submitted successfully!");
      navigate("/");

    } catch (error) {
      console.error("Error submitting donation:", error);
    }
  };

  return (
    <div className="donation-form" style={{marginTop:"85px"}}>
      <h2>Donation Form</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Donor Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>

        <label>
          Type of Donation:
          <select
            value={donationType}
            onChange={(e) => setDonationType(e.target.value)}
            required
          >
            <option value="">-- Select --</option>
            <option value="Food">Food</option>
            <option value="Clothes">Clothes</option>
            <option value="Money">Money</option>
            <option value="Books">Books</option>
            <option value="Other">Other</option>
          </select>
        </label>

        <label>
          Quantity / Amount:
          <input
            type="text"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
          />
        </label>

      

        

        <label>
          Address:
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </label>

        <label>
          Orphanage:
          <input
            type="text"
            value={orphanageName}
            disabled
            readOnly
          />
        </label>

        <button type="submit">Submit Donation</button>
      </form>
    </div>
  );
};

export default DonationForm;
