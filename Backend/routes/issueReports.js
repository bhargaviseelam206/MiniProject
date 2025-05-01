const express = require('express');
const router = express.Router();
const IssueReport = require('../models/IssueReport');
const authMiddleware = require('../middleware/auth'); // ensure agent is logged in

// POST /api/issues
router.post('/', authMiddleware, async (req, res) => {
  const { donationId, reason } = req.body;

  if (!donationId || !reason) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const report = new IssueReport({
      donationId,
      agentId: req.user.id,
      reason,
    });

    await report.save();
    res.status(201).json({ message: 'Issue reported successfully', report });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;
