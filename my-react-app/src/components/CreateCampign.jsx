import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./CreateCampign.css";

const CreateCampign = () => {
  const navigate = useNavigate();
  
  // State to hold the campaign data
  const [campaignData, setCampaignData] = useState({
    name: "",
    description: "",
    goal: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCampaignData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(""); // Clear any previous errors

    const token = localStorage.getItem("token");

    if (!token) {
      setError("You need to be logged in to create a campaign.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8080/campign/create", // Backend endpoint to create campaign
        campaignData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        // Redirect to the donor dashboard or campaign list page after successful creation
        navigate("/donor-dashboard");
      } else {
        setError("Failed to create campaign. Please try again.");
      }
    } catch (error) {
      setError("Error creating campaign. Please try again.");
      console.error(error);
    }

    setLoading(false);
  };

  return (
    <div className="create-campaign-container" style={{minHeight:"100%",marginTop:"95px",marginBottom:"75px"}}>
      <h2>Create a Donation Campaign</h2>
      {error && <p className="error-message">{error}</p>}
      
      <form onSubmit={handleSubmit} className="create-campaign-form">
        <div className="form-group">
          <label htmlFor="name">Campaign Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={campaignData.name}
            onChange={handleChange}
            required
            placeholder="Enter campaign name"
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={campaignData.description}
            onChange={handleChange}
            required
            placeholder="Describe your campaign"
          />
        </div>

        <div className="form-group">
          <label htmlFor="goal">Donation Goal</label>
          <input
            type="number"
            id="goal"
            name="goal"
            value={campaignData.goal}
            onChange={handleChange}
            required
            placeholder="Enter donation goal"
          />
        </div>

        <div className="form-group">
          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? "Creating..." : "Create Campaign"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateCampign;
