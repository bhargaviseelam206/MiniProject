import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Feedback.css";

const FeedbackForm = () => {
  const [feedback, setFeedback] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFeedback((prevFeedback) => ({
      ...prevFeedback,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/feedback", feedback); // <-- API call to your backend
      setStatus("success");
      setFeedback({ name: "", email: "", message: "" });
      navigate("/"); // Redirect after submission
    } catch (error) {
      console.error("Error submitting feedback:", error);
      setStatus("error");
    }
  };

  return (
    <div className="feedback-form-container">
      <h2>Feedback Form</h2>
      {status === "success" && <div className="success-message">Thank you for your feedback!</div>}
      {status === "error" && <div className="error-message">There was an error submitting your feedback. Please try again.</div>}
      <form onSubmit={handleSubmit} className="feedback-form">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input type="text" id="name" name="name" value={feedback.name} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" value={feedback.email} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="message">Message</label>
          <textarea id="message" name="message" value={feedback.message} onChange={handleChange} required />
        </div>
        <button type="submit" className="submit-btn">Submit</button>
      </form>
    </div>
  );
};

export default FeedbackForm;
