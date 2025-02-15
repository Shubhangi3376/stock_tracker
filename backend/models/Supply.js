const mongoose = require("mongoose");

const supplySchema = new mongoose.Schema({
  retailerId: { type: mongoose.Schema.Types.ObjectId, ref: "Retailer" },
  date: { type: Date, default: Date.now },
  suppliedPackets: Number,
});

module.exports = mongoose.model("Supply", supplySchema);
