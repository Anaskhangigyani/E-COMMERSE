const { required } = require("joi");
const mongoose = require("mongoose");

// Define the sold schema
const soldSchema = new mongoose.Schema({
  shopperName: { type: String, required: true },
  shopperNo: { type: String, required: true, unique: true },
  shopperPrice: { type: Number, required: true }, // Change to Number
  suits: [
    {
      name: { type: String, required: true },
      color: { type: String, required: true },
      suitNo: { type: String, required: true },
      shopperNo: { type: String },
    },
  ],
  soldAt: { type: Date, default: Date.now },
});

// Define the Sold model
const Sold = mongoose.model("Sold", soldSchema);

module.exports = { Sold };
