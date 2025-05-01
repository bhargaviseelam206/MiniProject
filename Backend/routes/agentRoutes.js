
const express = require("express");
const router = express.Router();
const Donation = require("../models/Donation");
const authMiddleware = require("../middleware/authMiddleware");


// Get all donations for agent
router.get("/donations",authMiddleware,async (req, res) => {
  try {
    const donations = await Donation.find();
    res.status(200).json(donations);
  } catch (error) {
    res.status(500).json({ message: "Error fetching donations", error });
  }
});


module.exports = router;
