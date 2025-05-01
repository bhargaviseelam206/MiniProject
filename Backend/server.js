const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

// Route imports
const adminRoutes = require("./routes/adminRoutes");
const agentRoutes = require("./routes/agentRoutes");
const donorRoutes = require("./routes/donorRoutes");
const userRoutes = require("./routes/user.js");
const donationRoutes = require("./routes/donations.js");
const feedbackRoutes = require("./routes/feedbackRoutes.js"); 
const campignRoutes = require("./routes/campign.js");
const orphanageRoutes = require('./routes/orphanageRoutes.js');


dotenv.config(); 

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB connection
const MONGO_URL = process.env.MONGO_URL;
async function main() {
    try {
        await mongoose.connect(MONGO_URL);
        console.log("Database connection established successfully");
    } catch (err) {
        console.error("Database connection error:", err);
    }
}
main();

// Routes
app.use("/admin", adminRoutes);
app.use("/agent", agentRoutes);
app.use("/donor", donorRoutes);
app.use("/", userRoutes);
app.use("/", donationRoutes);
app.use("/feedback", feedbackRoutes); 
app.use("/campign", campignRoutes);
app.use("/donations", orphanageRoutes); 
//app.use("/", orphanageDonationRoutes); // NEW

app.get("/", (req, res) => {
    res.send("Food Donation System API is running...");
});

// Error handler
app.use((err, req, res, next) => {
    console.error("Error:", err.message);
    res.status(500).json({ error: "Internal Server Error" });
});

// Server listener
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
