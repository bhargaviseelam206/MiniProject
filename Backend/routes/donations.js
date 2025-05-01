const express = require('express');
const router = express.Router();
const Donation = require('../models/Donation'); 

module.exports = router;


router.post('/donate', async (req, res) => {
  try {
    const { name, email, phoneNo, typeOfFood, quantity, address } = req.body;

    // Optional: Basic validation
    if (!name || !email || !phoneNo || !typeOfFood || !quantity || !address) {
      return res.status(400).json({ error: 'Please fill all the fields.' });
    }

    const donation = new Donation({
      name,
      email,
      phoneNo,
      typeOfFood,
      quantity,
      address,
    });

    await donation.save();

    res.status(201).json({ message: 'Donation saved successfully!' });
  } catch (err) {
    console.error(" Error saving donation:", err);
    res.status(500).json({ error: 'Failed to save donation.' });
  }
});

module.exports = router;
