import React from 'react';
import { useNavigate } from 'react-router-dom';
import "./ExplorePage.css";

const ExplorePage = () => {
  const navigate = useNavigate();

  const handleSignup = () => {
    navigate("/signup");
  };

  return (
    <div className="explore-container">
      {/* Stats Section */}
      <div className="stats-section">
        <h2>Our Impact</h2>
        <div className="stats-cards">
          <div className="stat-card">
            <h3>Meals Donated</h3>
            <p>2,500+</p>
          </div>
          <div className="stat-card">
            <h3>People Fed</h3>
            <p>10,000+</p>
          </div>
          <div className="stat-card">
            <h3>Orphanages Supported</h3>
            <p>50+</p>
          </div>
          <div className="stat-card">
            <h3>Active Agents</h3>
            <p>100+</p>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="how-it-works-section">
        <h2>How It Works</h2>
        <div className="steps">
          <div className="step">
            <h3>1. Donate</h3>
            <p>Donate your extra food through the app.</p>
          </div>
          <div className="step">
            <h3>2. Pickup</h3>
            <p>Our agents pick up the food at your convenience.</p>
          </div>
          <div className="step">
            <h3>3. Deliver</h3>
            <p>Food is delivered to orphanages and shelters in need.</p>
          </div>
        </div>
      </div>

      {/* Orphanages Section */}
      <div className="orphanages-section">
        <h2>Featured Orphanages</h2>
        <div className="orphanages-cards">
          <div className="card">
            <img src="https://images.unsplash.com/photo-1556905055-8f358a7a47b2" alt="Orphanage 1" />
            <h3>Sunshine Orphanage</h3>
            <p>123 Sunshine Street</p>
            <button>Donate Food</button>
          </div>
          <div className="card">
            <img src="./chil.jpeg" alt="Orphanage 2" />
            <h3>Little Stars Home</h3>
            <p>456 Hope Lane</p>
            <button>Donate Food</button>
          </div>
          {/* Add more orphanages as needed */}
        </div>
      </div>

      {/* Call-to-Action Section */}
      <div className="cta-section">
        <h2>Join the Movement</h2>
        <div className="cta-buttons">
          <button onClick={handleSignup}>Sign up as Donor</button>
          <button onClick={handleSignup}>Sign up as Agent</button>
        </div>
      </div>
    </div>
  );
};

export default ExplorePage;
