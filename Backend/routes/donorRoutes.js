const express = require("express");
const router = express.Router();

// Example Donor Route
router.post("/donate", (req, res) => {
    const { foodType, quantity, location } = req.body;
    res.json({ message: "Food donation received", foodType, quantity, location });
});

module.exports = router;
