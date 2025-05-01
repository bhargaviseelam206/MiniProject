import React from 'react';
import { useNavigate } from 'react-router-dom';
import "./Corousel.css";

const Corousel = () => {
  const navigate = useNavigate();

  const handleExplore = () => {
    navigate("/explore");
  };

  return (
    <div className="hero-container">
      <div className="hero-content">
        <h2>Donate Smart-Feed More</h2>
        <p>
        Welcome to the Smart Donation System – a unified platform where kindness meets purpose. 
        From food and clothes to essential accessories, your contributions bring hope to orphanages 
        and shelters.
        </p>
        <button onClick={handleExplore}>Explore</button>
      </div>
    </div>
  );
};

export default Corousel;
