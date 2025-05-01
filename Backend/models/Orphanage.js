const mongoose = require('mongoose');

// Define the orphanage donation schema
const orphanageSchema = new mongoose.Schema(
  {
    donorName: {
      type: String,
      required: true,
    },
    donationType: {
      type: String,
      required: true,
    },
    quantity: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: false,
    },
    orphanageName: {
      type: String,
      required: true,
    },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

// Create the model from the schema
const Orphanage = mongoose.model('Orphanage', orphanageSchema);

module.exports = Orphanage;
