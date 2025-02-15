const express = require("express");
const Supply = require("../models/Supply");
const Retailer = require("../models/Retailer"); // Import Retailer model

const router = express.Router();

// Add a supply entry
router.post("/add", async (req, res) => {
  try {
    const { retailerId, suppliedPackets } = req.body;

    // Check if the retailerId exists
    const retailer = await Retailer.findById(retailerId);
    if (!retailer) {
      return res.status(400).json({ error: "Retailer not found" });
    }

    const supply = new Supply({ retailerId, suppliedPackets });
    await supply.save();
    res.status(201).json({ message: "Supply entry added successfully", supply });
  } catch (error) {
    res.status(500).json({ error: "Failed to add supply entry" });
  }
});

// Get all supply entries
router.get("/", async (req, res) => {
  try {
    const supplies = await Supply.find().populate("retailerId", "name");
    res.status(200).json(supplies);
  } catch (error) {
    res.status(500).json({ error: "Error fetching supplies" });
  }
});

module.exports = router;
