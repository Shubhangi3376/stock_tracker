const express = require("express");
const Sales = require("../models/Sales");

const router = express.Router();

// Add a sales entry
router.post("/add", async (req, res) => {
  try {
    const { retailerId, soldPackets } = req.body;
    const sales = new Sales({ retailerId, soldPackets });
    await sales.save();
    res.status(201).json({ message: "Sales logged successfully", sales });
  } catch (error) {
    res.status(500).json({ error: "Error logging sales" });
  }
});

// Get all sales entries
router.get("/", async (req, res) => {
  try {
    const sales = await Sales.find().populate("retailerId", "name");
    res.status(200).json(sales);
  } catch (error) {
    res.status(500).json({ error: "Error fetching sales" });
  }
});

module.exports = router;
