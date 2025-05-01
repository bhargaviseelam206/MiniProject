import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("donors");
  const [donors, setDonors] = useState([]);
  const [agents, setAgents] = useState([]);
  const [donations, setDonations] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);
  const [campaigns, setCampaigns] = useState([]);
  const [orphanageDonations, setOrphanageDonations] = useState([]); 
  const [newAgent, setNewAgent] = useState({ username: "", email: "", password: "" });
  const [newDonor, setNewDonor] = useState({ username: "", email: "", password: "" });

  useEffect(() => {
    fetchData("donors");
  }, []);

  const fetchData = async (type) => {
    try {
      const token = localStorage.getItem("token");
      let response;

      if (type === "donors") {
        response = await axios.get("http://localhost:8080/admin/donors", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setDonors(response.data);
      } else if (type === "agents") {
        response = await axios.get("http://localhost:8080/admin/agents", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAgents(response.data);
      } else if (type === "donations") {
        response = await axios.get("http://localhost:8080/admin/donations", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setDonations(response.data);
      } else if (type === "feedbacks") {
        response = await axios.get("http://localhost:8080/admin/feedbacks", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setFeedbacks(response.data);
      } else if (type === "campaigns") {
        response = await axios.get("http://localhost:8080/admin/campigns", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCampaigns(response.data.campaigns);
      } else if (type === "orphanages") {
       
        response = await axios.get("http://localhost:8080/admin/orphanage-donations", {
          headers: { Authorization: `Bearer ${token}` },
       }); // No token needed here if not protected
       setOrphanageDonations(response.data);
       
      }
    } catch (error) {
      console.error(`Error fetching ${type}:`, error);
    }
  };

  const handleAddAgent = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.post("http://localhost:8080/admin/add-agent", newAgent, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Agent added successfully!");
      fetchData("agents");
      setNewAgent({ username: "", email: "", password: "" });
    } catch (error) {
      console.error("Error adding agent:", error);
      alert("Failed to add agent.");
    }
  };

  const handleDeleteAgent = async (agentId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this agent?");
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:8080/admin/delete-agent/${agentId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setAgents(agents.filter((agent) => agent._id !== agentId));
      alert("Agent removed successfully!");
    } catch (error) {
      console.error("Error deleting agent:", error);
      alert("Failed to delete agent.");
    }
  };

  const handleAddDonor = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.post("http://localhost:8080/admin/add-donor", newDonor, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Donor added successfully!");
      fetchData("donors");
      setNewDonor({ username: "", email: "", password: "" });
    } catch (error) {
      console.error("Error adding donor:", error);
      alert("Failed to add donor.");
    }
  };

  const handleDeleteDonor = async (donorId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:8080/admin/delete-donor/${donorId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Donor removed!");
      fetchData("donors");
    } catch (error) {
      console.error("Error deleting donor:", error);
      alert("Failed to delete donor.");
    }
  };

  const renderFeedbacks = () => {
    return feedbacks.length === 0 ? (
      <p>No feedbacks available.</p>
    ) : (
      feedbacks.map((feedback, index) => (
        <div className="feedback-card" key={index}>
          <h4>{feedback.name}</h4>
          <p>{feedback.message}</p>
        </div>
      ))
    );
  };

  const renderContent = () => {
    if (activeTab === "donors") {
      return (
        <div className="donor-section" style={{ marginLeft: "170px" }}>
          {/* Donors Table */}
          <table className="table">
            <thead>
              <tr>
                <th>Serial No</th>
                <th>Donor Name</th>
                <th>Email</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {donors.map((donor, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{donor.username}</td>
                  <td>{donor.email}</td>
                  <td>
                    <button onClick={() => handleDeleteDonor(donor._id)}>Remove</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Add New Donor Form */}
          <div className="add-agent-form" style={{ marginLeft: "120px" }}>
            <h4>Add New Donor</h4>
            <input
              type="text"
              placeholder="Username"
              value={newDonor.username}
              onChange={(e) => setNewDonor({ ...newDonor, username: e.target.value })}
            />
            <input
              type="email"
              placeholder="Email"
              value={newDonor.email}
              onChange={(e) => setNewDonor({ ...newDonor, email: e.target.value })}
            />
            <input
              type="password"
              placeholder="Password"
              value={newDonor.password}
              onChange={(e) => setNewDonor({ ...newDonor, password: e.target.value })}
            />
            <button onClick={handleAddDonor}>Add Donor</button>
          </div>
        </div>
      );
    } else if (activeTab === "agents") {
      return (
        <div className="agent-section">
          {/* Agents Table */}
          <table className="agent-table">
            <thead>
              <tr>
                <th>Serial No</th>
                <th>Agent Name</th>
                <th>Email</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {agents.map((agent, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{agent.username}</td>
                  <td>{agent.email}</td>
                  <td>
                    <button onClick={() => handleDeleteAgent(agent._id)}>Remove</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Add New Agent Form */}
          <div className="add-agent-form">
            <h4>Add New Agent</h4>
            <input
              type="text"
              placeholder="Username"
              value={newAgent.username}
              onChange={(e) => setNewAgent({ ...newAgent, username: e.target.value })}
            />
            <input
              type="email"
              placeholder="Email"
              value={newAgent.email}
              onChange={(e) => setNewAgent({ ...newAgent, email: e.target.value })}
            />
            <input
              type="password"
              placeholder="Password"
              value={newAgent.password}
              onChange={(e) => setNewAgent({ ...newAgent, password: e.target.value })}
            />
            <button onClick={handleAddAgent}>Add Agent</button>
          </div>
        </div>
      );
    } else if (activeTab === "donations") {
      const donationImages = {
        medicines: "./medicin.jpg",
        clothes: "./cloth.jpg",
        hygiene: "./hygene.jpg",
        food:"./image3.jpg"
      };

      return donations.map((donation, index) => (
        <div className="card" key={index} style={{ width: '320px', textAlign: 'center', marginBottom: '20px' }}>
          <img
            src={donationImages[donation.typeOfFood] || "./image1.jpg"}
            alt={donation.typeOfFood}
            style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '10px' }}
          />
          <h3 style={{color:"#2c3e50",fontWeight:"bold"}}>{donation.name}</h3>
          <p>Type: {donation.typeOfFood}</p>
          <p>Quantity: {donation.quantity}</p>
          <p>Address: {donation.address}</p>
        </div>
      ));
    } else if (activeTab === "orphanages") {
      return (
        <div className="orphanage-section">
          
          <div className="orphanage-list-container">
            {orphanageDonations.length === 0 ? (
              <p>No orphanage donations available.</p>
            ) : (
              orphanageDonations.map((item, index) => (
                <div className="orphanage-item" key={index}>
                  <div className="orphanage-item-header">
                    <h5>{item.donorName}</h5>
                    <span className="donation-type">{item.donationType}</span>
                  </div>
                  <div className="orphanage-item-details">
                    <p><strong>Quantity:</strong> {item.quantity}</p>
                    <p><strong>Message:</strong> {item.message}</p>
                    <p><strong>Orphanage Name:</strong> {item.orphanageName}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      );
    } else if (activeTab === "feedbacks") {
      return (
        <div className="feedback-section">
          <h4>Feedbacks</h4>
          <div className="feedback-cards">
            {renderFeedbacks()}
          </div>
        </div>
      );
    } else if (activeTab === "campaigns") {
      return campaigns.length === 0 ? (
        <p>No campaigns found.</p>
      ) : (
        <div className="card-grid">
          {campaigns.map((campaign, index) => (
            <div className="campaign-card" key={index}>
              <h3 className="campaign-title">{campaign.name}</h3>
              <p className="campaign-description">{campaign.description}</p>
              <div className="campaign-goal">
                <strong>Goal:</strong> {campaign.goal}
              </div>
            </div>
          ))}
        </div>
      );
    }
  };

  return (
    <div className="admin-dashboard-container">
      <div className="sidebar">
        <h3>Admin Panel</h3>
        <button className={activeTab === "donors" ? "active" : ""} onClick={() => { setActiveTab("donors"); fetchData("donors"); }}>Donor Details</button>
        <button className={activeTab === "agents" ? "active" : ""} onClick={() => { setActiveTab("agents"); fetchData("agents"); }}>Agent Details</button>
        <button className={activeTab === "donations" ? "active" : ""} onClick={() => { setActiveTab("donations"); fetchData("donations"); }}>Donation Details</button>
        <button className={activeTab === "orphanages" ? "active" : ""} onClick={() => { setActiveTab("orphanages"); fetchData("orphanages"); }}>Orphanage Donations</button> {/* New Button */}
        <button className={activeTab === "feedbacks" ? "active" : ""} onClick={() => { setActiveTab("feedbacks"); fetchData("feedbacks"); }}>Feedbacks</button>
        <button className={activeTab === "campaigns" ? "active" : ""} onClick={() => { setActiveTab("campaigns"); fetchData("campaigns"); }}>Campaign Details</button>
      </div>
      <div className="dashboard-content">
        <h2>
          {activeTab === "donors" && "Donor Details"}
          {activeTab === "agents" && "Agent Details"}
          {activeTab === "donations" && "Donation Details"}
          {activeTab === "orphanages" && "Orphanage Donations"}
          {activeTab === "feedbacks" && "Feedbacks"}
          {activeTab === "campaigns" && "Campaign Details"}
        </h2>
        <div className="card-grid">{renderContent()}</div>
      </div>
    </div>
  );
};

export default AdminDashboard;
