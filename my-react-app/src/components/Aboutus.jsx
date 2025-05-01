import React from 'react';
import './Aboutus.css'; // Ensure this file contains the styles for the classes below

const AboutUs = () => {
  return (
    <div className="about-us-section">
      <h1 className="about-us-title">About Us</h1>

      <div className="about-us-content">
        {/* Image on Left */}
        <div className="about-us-image-wrapper">
          <img src="/aboutimg.jpg" alt="About Us" className="about-us-image" />
        </div>

        {/* Text on Right */}
        <div className="about-us-text">
          <h2 className="about-us-subtitle">Who We Are</h2>
          <p className="about-us-paragraph">
            We are a passionate team dedicated to reducing food waste and feeding the hungry.
            Our platform bridges the gap between food donors and those in need through seamless coordination with agents and administrators.
          </p>
          <p className="about-us-paragraph">
            With your support, we’re building a future where no food goes to waste and every meal finds a home. Join us on this mission. 💚
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
