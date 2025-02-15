const express = require('express');
const Retailer = require('../models/Retailer');
const router = express.Router();

// Add a new retailer
router.post('/add', async (req, res) => {
  try {
    const { name, contact, location } = req.body;

    // Check if the required fields are provided
    if (!name || !contact || !location) {
      return res.status(400).json({ error: 'All fields (name, contact, location) are required' });
    }

    const retailer = new Retailer({ name, contact, location });
    
    // Try saving the retailer
    await retailer.save();

    // Respond with success message
    res.status(201).json({ message: 'Retailer added successfully', retailer });
  } catch (error) {
    // Log detailed error
    console.error("Error adding retailer:", error);
    res.status(500).json({ error: 'Error adding retailer', details: error.message });
  }
});

// Get all retailers
router.get('/', async (req, res) => {
  try {
    const retailers = await Retailer.find();
    res.status(200).json(retailers);
  } catch (error) {
    // Log detailed error
    console.error("Error fetching retailers:", error);
    res.status(500).json({ error: 'Error fetching retailers', details: error.message });
  }
});

module.exports = router;
