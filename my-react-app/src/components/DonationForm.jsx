import { useState } from "react";
import axios from "axios";
import "./DonationForm.css";
import { useNavigate } from "react-router-dom";

const DonationForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNo: "",
    typeOfFood: "",
    quantity: "",
    address: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const token = localStorage.getItem("token");
  
    try {
      const res = await axios.post("http://localhost:8080/donate", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert("Donation submitted successfully!");
      console.log("Response:", res.data);
      // Reset form
      setFormData({
        name: "",
        email: "",
        phoneNo: "",
        typeOfFood: "",
        quantity: "",
        address: "",
      });
      navigate("/");
    } catch (error) {
      console.error("Donation submission failed:", error.response?.data || error.message);
      alert("Failed to submit donation. Please try again.");
    }
  };
  
  return (
    <div className="donation-form" style={{ marginTop: "80px",marginBottom:"10px"}}>
      <h2 className="form-head">Donate Essential Items</h2>
      <p>Your donation can make a difference! Fill out the form below.</p>

      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Your Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <label htmlFor="email">Your Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <label htmlFor="phoneNo">Your Phone Number:</label>
        <input
          type="tel"
          id="phoneNo"
          name="phoneNo"
          value={formData.phoneNo}
          onChange={handleChange}
          required
        />

        <label htmlFor="typeOfFood">Select Donation Type:</label>
        <select
          id="typeOfFood"
          name="typeOfFood"
          value={formData.typeOfFood}
          onChange={handleChange}
          required
        >
          <option value="">--Select--</option>
          <option value="food">Food</option>
          <option value="clothes">Clothes</option>
          <option value="medicines">Medicines</option>
          <option value="hygiene">Hygiene Products</option>
          <option value="others">Others</option>
        </select>

        <label htmlFor="quantity">Quantity:</label>
        <input
          type="number"
          id="quantity"
          name="quantity"
          value={formData.quantity}
          onChange={handleChange}
          min="1"
          required
        />

        <label htmlFor="address">Address:</label>
        <textarea
          id="address"
          name="address"
          rows="4"
          value={formData.address}
          onChange={handleChange}
          required
        ></textarea>

        <button className="btb" type="submit">
          Donate Now
        </button>
      </form>
    </div>
  );
};

export default DonationForm;
