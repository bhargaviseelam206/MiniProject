import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const URL = "http://localhost:8080/login";

const Login = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    username: "",
    email:"",
    password: "",
    role: "",
  });

  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState("");  

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const sendRequest = async () => {
    try {
      setLoading(true);  // Start loading
      setError(""); // Reset error

      const res = await axios.post(URL, {
        username: formData.username,
        email:formData.email,
        password: formData.password,
        role: formData.role,
      });

      const { token, role, id } = res.data;
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      localStorage.setItem("id", id);

      // Redirect based on role
      if (role === "admin") {
        navigate("/admin-dashboard");
      } else if (role === "agent") {
        navigate("/agent-dashboard");
      } else if (role === "donor") {
        navigate("/donor-dashboard");
      }
    } catch (err) {
      console.error("Error logging in", err);
      setError("Invalid credentials or something went wrong. Please try again.");  // Display error message
    } finally {
      setLoading(false);  // Stop loading
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendRequest();
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light" style={{marginTop:"20px"}}>
      <div className="card p-4 shadow-lg w-25">
        <h2 className="text-center mb-4">Login</h2>
        
        {error && <div className="alert alert-danger">{error}</div>}

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
              <option value="">Select Role</option>
              <option value="admin">Admin</option>
              <option value="agent">Agent</option>
              <option value="donor">Donor</option>
            </select>
          </div>

          <button type="submit" className="btn btn-primary w-100" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
