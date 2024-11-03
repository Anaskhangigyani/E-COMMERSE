const mongoose = require("mongoose");

const suitSchema = new mongoose.Schema({
  name: { type: String, required: true },
  color: { type: String, required: true },
  suitNo: { type: String, required: true },
  shopperNo: { type: String },
});

const shopperSchema = new mongoose.Schema({
  shopperName: { type: String, required: true },
  shopperNo: { type: String, required: true, unique: true },
  shopperPrice: { type: Number, required: true }, // Change to Number
  suits: [suitSchema],
});

shopperSchema.pre("save", function (next) {
  if (this.isModified("suits")) {
    this.suits.forEach((suit) => {
      suit.shopperNo = this.shopperNo;
    });
  }
  next();
});

const Shopper = mongoose.model("Shopper", shopperSchema);
const Suit = mongoose.model("Suit", suitSchema);

module.exports = { Shopper, Suit };
