const express = require('express');
const Donation = require('../models/Orphanage.js');  // Ensure the correct model is used
const router = express.Router();

// POST - Submit a donation
router.post('/', async (req, res) => {
  const { donorName, donationType, quantity, message, orphanageName } = req.body;

  try {
    const newDonation = new Donation({
      donorName,
      donationType,
      quantity,
      message,
      orphanageName,
    });

    await newDonation.save();  // Save donation to the database
    res.status(201).json({ message: 'Donation submitted successfully!' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
