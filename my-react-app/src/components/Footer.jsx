import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import "./Footer.css";
function Footer() {
  return (
    <div>
      <footer className="footer">
        <div className="footer-content">
          <p className="company-name">Smart Donation System Pvt. Ltd.</p>

          <div className="social-icons">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebook />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTwitter />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin />
            </a>
          </div>

          <div className="contact-info">
            <p>
              📍 RGUKT,RK-valley, India | 📞 +123 456 7890 | 📧
              contact@fooddonation.com
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
