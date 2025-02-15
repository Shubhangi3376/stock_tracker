const mongoose = require('mongoose');

const retailerSchema = new mongoose.Schema({
  name: String,
  contact: String,
  location: String,
});

module.exports = mongoose.model('Retailer', retailerSchema);
