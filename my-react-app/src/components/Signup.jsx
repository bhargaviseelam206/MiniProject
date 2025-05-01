import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const URL = "http://localhost:8080/signup";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email:"",
    password: "",
    role: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const sendRequest = async () => {
    try {
      await axios.post(URL, {
        username: formData.username,
        email:formData.email,
        password: formData.password,
        role: formData.role,
      });
      console.log("Signup successful");
      navigate("/");
    } catch (err) {
      console.error("Error signing up", err);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendRequest();
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light" style={{marginTop:"20px"}}>
      <div className="card p-4 shadow-lg w-25">
        <h2 className="text-center mb-4">SignUp</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Username</label>
            <input
              type="text"
              name="username"
              className="form-control"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">email</label>
            <input
              type="email"
              name="email"
              className="form-control"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              name="password"
              className="form-control"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Role</label>
            <select
              name="role"
              className="form-select"
              value={formData.role}
              onChange={handleChange}
              required
            >
              <option value="role"></option>
              <option value="admin">Admin</option>
              <option value="donor">Donor</option>
              <option value="agent">Agent</option>
            </select>
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;