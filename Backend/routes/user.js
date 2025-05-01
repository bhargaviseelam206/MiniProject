const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Admin = require("../models/admin.js");
const Agent = require("../models/agent.js");
const Donor = require("../models/donor.js");
const authMiddleware = require("../middleware/authMiddleware");

require("dotenv").config();
const jwtSecretKey = process.env.JWT_SECRET_KEY;

// User Registration Route
router.post("/signup", async (req, res) => {
  const { username,email, password, role } = req.body;
  try {
    if (!username || !email || !password || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    let user;

    if (role === "admin") {
      user = new Admin({ username,email, password: hashedPassword, role });
    } else if (role === "agent") {
      user = new Agent({ username,email, password: hashedPassword, role });
    } else if (role === "donor") {
      user = new Donor({ username,email, password: hashedPassword, role });
    } else {
      return res.status(400).json({ message: "Inva font-weight: bold;lid role" });
    }

    await user.save();
    res.status(201).json({ message: "User registered successfully" });

  } catch (error) {
    console.error("Signup Error:", error);
    res.status(500).json({ message: "Server error", error });
  }
});

// Fetch All Users (Admins, Agents, Donors)
router.get("/users", async (req, res) => {
  try {
    const admins = await Admin.find({});
    const agents = await Agent.find({});
    const donors = await Donor.find({});
    res.json({ admins, agents, donors });
  } catch (error) {
    console.error("Fetching Users Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// User Login Route
router.post("/login", async (req, res) => {
  const { username,email, password, role } = req.body;

  try {
    if (!username || !email || !password || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }

    let user;
    if (role === "admin") {
      user = await Admin.findOne({ username,email });
    } else if (role === "agent") {
      user = await Agent.findOne({ username,email });
    } else if (role === "donor") {
      user = await Donor.findOne({ username,email });
    } else {
      return res.status(400).json({ message: "Invalid role" });
    }

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare entered password with stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate JWT Token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      jwtSecretKey,
      { expiresIn: "1h" }
    );

    res.json({ token, role: user.role, id: user._id });

  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Server error", error });
  }
});

// Protected Route Example
router.get("/dashboard", authMiddleware, (req, res) => {
  res.json({ message: "Welcome to the dashboard", user: req.user });
});

module.exports = router;