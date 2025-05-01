import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./DonorDashboard.css";

const DonorDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  // Fetch the user data when the component mounts
  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        // If no token, redirect to login page
        navigate("/login");
        return;
      }

      try {
        const response = await axios.get("http://localhost:8080/dashboard", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(response.data.user); // Set user data
      } catch (error) {
        console.error("Error fetching user data:", error);
        navigate("/login"); // Redirect to login if token is invalid
      }
    };

    fetchUserData();
  }, [navigate]);


  // If user data is not loaded yet, return loading message
  if (!user) {
    return <div>Loading...</div>;
  }

  // Handle navigate to donation page
  const handleDonate = () => {
    navigate("/donation");
  };

  return (
    <div style={{ marginTop: "65px" }}>
      <div className="con2">
        <div className="bg_col">
          <div className="food">
            <h2 className="foodhead">DONATE FOOD</h2>
            <p>
              Food donation serves a dual purpose by reducing food wastage and
              providing essential sustenance to individuals and families facing
              economic challenges. Food donation fosters a sense of community
              and solidarity, ensuring that no one goes to bed hungry.
            </p>
            <div className="bt">
              <button className="btb" onClick={handleDonate}>Donate</button>
            </div>
          </div>
          <div className="grocery">
            <h2 className="groceryhead">DONATE GROCERY</h2>
            <p>
              This charitable gesture aims to support individuals and families
              facing financial hardship or crisis by providing them with the
              necessary resources to meet their basic needs. Grocery donations
              can take place through organized food drives, community
              initiatives, or direct contributions to food banks and shelters.
            </p>
            <div className="bt">
              <button className="btb" onClick={handleDonate}>Donate</button>
            </div>
          </div>
          <div className="girl-needs">
            <h2 className="girl-needs-head">GIRL NEEDS</h2>
            <p>
              Girls, especially in challenging circumstances, require essential
              products to support their health, hygiene, and well-being.
              Providing these items ensures their dignity, confidence, and
              safety, enabling them to thrive regardless of their situation.
            </p>
            <div className="bt">
              <button className="btb" onClick={handleDonate}>Donate</button>
            </div>
          </div>
          <div className="medicines">
            <h2 className="medicines-head">MEDICINES</h2>
            <p>
              Access to essential medicines is crucial for maintaining health
              and treating common illnesses. Donating medicines helps
              individuals receive the necessary care for their well-being,
              ensuring they can recover and lead a healthier life.
            </p>
            <div className="bt">
              <button className="btb" onClick={handleDonate}>Donate</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonorDashboard;
