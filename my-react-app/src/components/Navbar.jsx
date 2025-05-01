import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token"); // Check if the user is logged in
  const role = localStorage.getItem("role"); // Get the role from localStorage

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("id");
    navigate("/"); // Redirect to home page
  };

  const goToPreviousDonations = () => {
    navigate("/previous-donations");
  };

  const goToCreateCampaign = () => {
    navigate("/create-campaign"); // Navigate to the Create Campaign page
  };

  const goToOrphanages = () => {
    navigate("/Orphanages"); // Navigate to the Create Campaign page
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src="./Donation.png" alt="Donation Logo" className="logo-icon" />
        <h1 className="logo nav-links">
          <Link to="/">Smart Donation System</Link> {/* Use Link component */}
        </h1>
      </div>
      <ul className="nav-links">
        {!token ? (
          <>
            <li>
              <Link to="/signup">Signup</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/feedback">Feedback</Link>
            </li>
            <li>
              <Link to="/aboutus">About</Link>
            </li>
          </>
        ) : (
          <>
            {role === "donor" && (
              <>
                <li>
                  <button onClick={goToPreviousDonations} className="nav-btn">
                    Previous Donations
                  </button>
                </li>
                <li>
                  <button onClick={goToCreateCampaign} className="nav-btn">
                    Create Campaign
                  </button>
                </li>
                <li>
                  <button onClick={goToOrphanages} className="nav-btn">
                    Orphanages
                  </button>
                </li>
              </>
            )}

            <li>
              <button onClick={handleLogout} className="logout-btn">
                Logout
              </button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
