// models/Issue.js
const mongoose = require("mongoose");

const issueSchema = new mongoose.Schema({
  agentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // or "Agent" based on your schema
    required: true,
  },
  foodId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Donation", // if you track food this way
  },
  description: {
    type: String,
    required: true,
  },
  reportedAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model("Issue", issueSchema);
