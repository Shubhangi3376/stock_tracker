import React, { useState, useEffect } from "react";
import axios from "axios";

const StockSummary = () => {
  const [stockSummary, setStockSummary] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStockSummary = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/stock/summary");
        console.log("API Response:", response.data); // Debugging
        setStockSummary(response.data);
      } catch (error) {
        console.error("Error fetching stock summary:", error);
        alert("⚠️ Failed to load stock summary.");
      } finally {
        setLoading(false);
      }
    };

    fetchStockSummary();
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">📊 Stock Summary</h2>

      {loading ? (
        <p className="text-center">⏳ Loading stock data...</p>
      ) : stockSummary.length === 0 ? (
        <p className="text-center text-danger">⚠️ No stock data available.</p>
      ) : (
        <table className="table table-bordered">
          <thead className="thead-dark">
            <tr>
              <th>👤 Retailer Name</th>
              <th>🚚 Supplied</th>
              <th>💸 Sold</th>
              <th>📊 Remaining Stock</th>
            </tr>
          </thead>
          <tbody>
            {stockSummary.map((retailer, index) => (
              <tr key={index}>
                <td>{retailer.retailerName}</td> {/* Replaced retailerId with retailerName */}
                <td>{retailer.totalSupplied}</td>
                <td>{retailer.totalSold}</td>
                <td className={retailer.stockRemaining <= 5 ? "text-danger font-weight-bold" : ""}>
                  {retailer.stockRemaining}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default StockSummary;
