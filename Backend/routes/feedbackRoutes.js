const express = require("express");
const router = express.Router();
const Feedback = require("../models/feedback");

router.post("/", async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const newFeedback = new Feedback({ name, email, message });
    await newFeedback.save();
    res.status(201).json({ message: "Feedback saved successfully" });
  } catch (error) {
    console.error("Feedback save error:", error);
    res.status(500).json({ error: "Failed to save feedback" });
  }
});

module.exports = router;
