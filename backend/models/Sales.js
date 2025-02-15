const mongoose = require("mongoose");

const salesSchema = new mongoose.Schema({
  retailerId: { type: mongoose.Schema.Types.ObjectId, ref: "Retailer" },
  date: { type: Date, default: Date.now },
  soldPackets: Number,
});

module.exports = mongoose.model("Sales", salesSchema);
