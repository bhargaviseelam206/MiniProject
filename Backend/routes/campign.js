const express = require('express');
const router = express.Router();
const Campign = require('../models/campign.js');
const authenticate = require('../middleware/authMiddleware'); // Optional if you want to keep authentication

// POST route to create a campaign
router.post('/create', authenticate, async (req, res) => {
  const { name, description, goal } = req.body;

  // Check if required fields are present
  if (!name || !description || !goal) {
    return res.status(400).json({ success: false, message: 'All fields are required.' });
  }

  try {
    // Create the new campaign without user association
    const newCampign = new Campign({
      name,
      description,
      goal,
      // No user association here anymore
    });

    // Save the new campaign to the database
    await newCampign.save();

    res.status(201).json({
      success: true,
      message: 'Campaign created successfully!',
      campign: newCampign,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error. Please try again later.' });
  }
});


module.exports = router;
