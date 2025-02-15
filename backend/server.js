const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./db");

const retailerRoutes = require("./routes/retailerRoutes");
const supplyRoutes = require("./routes/supplyRoutes");
const salesRoutes = require("./routes/salesRoutes");
const stockRoutes = require("./routes/stockRoutes"); // Import the stock route

// Initialize Express
const app = express();
app.use(express.json());
app.use(cors());

// Connect to Database
connectDB();

// Routes
app.use("/api/retailers", retailerRoutes);
app.use("/api/supply", supplyRoutes);
app.use("/api/sales", salesRoutes);
app.use("/api/stock", stockRoutes);

// Default Route
app.get("/", (req, res) => {
  res.send("Stock Tracking API is running...");
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));


