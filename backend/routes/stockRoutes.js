const express = require("express");
const router = express.Router();
const Sales = require("../models/Sales"); // Sales Model
const Supplies = require("../models/Supply"); // Supplies Model
const Retailers = require("../models/Retailer"); // Retailers Model
const mongoose = require("mongoose");

// Stock summary route
router.get("/summary", async (req, res) => {
  try {
    // Aggregate total suppliedPackets for each retailerId
    const totalSupply = await Supplies.aggregate([
      { $group: { _id: "$retailerId", totalSupplied: { $sum: "$suppliedPackets" } } }
    ]);

    // Aggregate total soldPackets for each retailerId
    const totalSales = await Sales.aggregate([
      { $group: { _id: "$retailerId", totalSold: { $sum: "$soldPackets" } } }
    ]);

    // Convert sales data into a Map for quick lookup
    const salesMap = new Map(totalSales.map(sale => [sale._id.toString(), sale.totalSold]));

    // Merge supply and sales data
    let stockSummary = totalSupply.map(supply => {
      const retailerId = supply._id.toString();
      const totalSold = salesMap.get(retailerId) || 0;
      return {
        retailerId: new mongoose.Types.ObjectId(retailerId),
        totalSupplied: supply.totalSupplied,
        totalSold: totalSold,
        stockRemaining: supply.totalSupplied - totalSold
      };
    });

    // Convert stockSummary into an aggregation pipeline for joining with retailers
    const summaryWithRetailers = await Retailers.aggregate([
      {
        $match: { _id: { $in: stockSummary.map(s => s.retailerId) } }
      },
      {
        $lookup: {
          from: "supplies", // Collection name in MongoDB
          localField: "_id",
          foreignField: "retailerId",
          as: "supplyData"
        }
      },
      {
        $lookup: {
          from: "sales", // Collection name in MongoDB
          localField: "_id",
          foreignField: "retailerId",
          as: "salesData"
        }
      },
      {
        $project: {
          _id: 0,
          retailerName: "$name",
          totalSupplied: {
            $sum: "$supplyData.suppliedPackets"
          },
          totalSold: {
            $sum: "$salesData.soldPackets"
          },
          stockRemaining: {
            $subtract: [{ $sum: "$supplyData.suppliedPackets" }, { $sum: "$salesData.soldPackets" }]
          }
        }
      }
    ]);

    res.json(summaryWithRetailers);
  } catch (error) {
    console.error("Error fetching stock summary:", error);
    res.status(500).json({ message: "Failed to fetch stock summary" });
  }
});

module.exports = router;
