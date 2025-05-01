const express = require("express");
const router = express.Router();
const Donation = require("../models/Donation");
const authMiddleware = require("../middleware/authMiddleware");
const Donor = require("../models/donor.js");
const Agent = require("../models/agent.js");
const bcrypt = require("bcryptjs");
const Feedback=require("../models/feedback.js");
const Campign = require("../models/campign.js");
const Orphanage = require("../models/Orphanage.js");
//const User = require("../models/User");

// Get all donation details
router.get("/donations", authMiddleware, async (req, res) => {
  try {
    const donations = await Donation.find();
    res.status(200).json(donations);
  } catch (error) {
    res.status(500).json({ message: "Error fetching donations", error });
  }
});

// Get all donor details
router.get("/donors", authMiddleware, async (req, res) => {
  try {
    const donors = await Donor.find();
    res.status(200).json(donors);
  } catch (error) {
    res.status(500).json({ message: "Error fetching donors", error });
  }
});
//Fetch all campaigns
// Make sure this matches your model and frontend exactly
router.get("/campigns", async (req, res) => {
  try {
    const campigns = await Campign.find();
    res.status(200).json({ campaigns: campigns });
  } catch (error) {
    console.error("Error fetching campigns:", error);
    res.status(500).json({ message: "Failed to fetch campigns" });
  }
});

// Get all agent details
router.get("/agents", authMiddleware, async (req, res) => {
  try {
    const agents = await Agent.find();
    res.status(200).json(agents);
  } catch (error) {
    res.status(500).json({ message: "Error fetching agents", error });
  }
});

// Add a new agent
router.post("/add-agent", authMiddleware, async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await Agent.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Agent with this email already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newAgent = new Agent({
      username,
      email,
      password: hashedPassword,
      role: "agent",
    });

    await newAgent.save();
    res.status(201).json({ message: "Agent added successfully." });
  } catch (error) {
    console.error("Error adding agent:", error);
    res.status(500).json({ message: "Internal server error." });
  }
});

// Delete Agent
router.delete("/delete-agent/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const deletedAgent = await Agent.findByIdAndDelete(id);
    if (!deletedAgent) {
      return res.status(404).json({ message: "Agent not found." });
    }
    res.status(200).json({ message: "Agent deleted successfully." });
  } catch (error) {
    console.error("Error deleting agent:", error);
    res.status(500).json({ message: "Internal server error." });
  }
});
router.post("/add-donor", authMiddleware, async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await Donor.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Donor with this email already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newDonor = new Donor({
      username,
      email,
      password: hashedPassword,
      role: "Donor",
    });

    await newDonor.save();
    res.status(201).json({ message: "Donor added successfully." });
  } catch (error) {
    console.error("Error adding Donor:", error);
    res.status(500).json({ message: "Internal server error." });
  }
});

// ✅ Delete Donor
router.delete("/delete-donor/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const deletedDonor = await Donor.findByIdAndDelete(id);
    if (!deletedDonor) {
      return res.status(404).json({ message: "Donor not found." });
    }
    res.status(200).json({ message: "Donor deleted successfully." });
  } catch (error) {
    console.error("Error deleting donor:", error);
    res.status(500).json({ message: "Internal server error." });
  }
});

router.get("/feedbacks", async (req, res) => {
  try {
    const feedbacks = await Feedback.find();
    res.json(feedbacks);
  } catch (err) {
    console.error("Error fetching feedbacks:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
router.get("/orphanage-donations", authMiddleware, async (req, res) => {
  try {
    const orphanageDonations = await Orphanage.find(); // adjust if you use populate
    res.status(200).json(orphanageDonations);
  } catch (error) {
    console.error("Error fetching orphanage donations:", error);
    res.status(500).json({ message: "Failed to fetch orphanage donations" });
  }
});



module.exports = router;
