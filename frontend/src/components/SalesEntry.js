import React, { useState, useEffect } from "react";
import axios from "axios";

const SalesEntry = () => {
  const [retailerId, setRetailerId] = useState("");
  const [soldPackets, setSoldPackets] = useState("");
  const [retailers, setRetailers] = useState([]);
  const [stock, setStock] = useState(null);
  const [date, setDate] = useState("");

  // API base URL (use Vercel env variable)
  const API_BASE_URL = process.env.REACT_APP_API_URL || "https://stock-tracker-v227.onrender.com";

  // Fetch retailers from backend
  useEffect(() => {
    const fetchRetailers = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/retailers`);
        setRetailers(response.data);
      } catch (error) {
        console.error("Error fetching retailers:", error);
        alert("⚠️ Failed to load retailers. Please check backend.");
      }
    };
    fetchRetailers();
  }, [API_BASE_URL]);

  // Fetch stock when retailer is selected
  useEffect(() => {
    if (retailerId) {
      const fetchStock = async () => {
        try {
          const response = await axios.get(`${API_BASE_URL}/api/stock/${retailerId}`);
          setStock(response.data.remainingStock);
        } catch (error) {
          console.error("Error fetching stock:", error);
          setStock(null);
        }
      };
      fetchStock();
    } else {
      setStock(null);
    }
  }, [retailerId, API_BASE_URL]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!retailerId || !soldPackets || !date) {
      alert("⚠️ Please fill out all fields.");
      return;
    }

    if (soldPackets <= 0) {
      alert("⚠️ Sold packets must be a positive number.");
      return;
    }

    try {
      await axios.post(`${API_BASE_URL}/api/sales/add`, {
        retailerId,
        soldPackets,
        date,
      });

      alert("✅ Sales entry added successfully!");
      setRetailerId("");
      setSoldPackets("");
      setDate("");
      setStock(null);
    } catch (error) {
      console.error("Error adding sales:", error);
      alert("❌ Failed to add sales entry.");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">💸 Sales Entry</h2>

      <form onSubmit={handleSubmit} className="p-4 border rounded shadow-sm">
        <div className="form-group mb-4">
          <label htmlFor="retailerId" className="font-weight-bold">👤 Select Retailer</label>
          <select
            className="form-control"
            id="retailerId"
            value={retailerId}
            onChange={(e) => setRetailerId(e.target.value)}
          >
            <option value="">-- Select Retailer --</option>
            {retailers.length === 0 ? (
              <option disabled>No retailers found</option>
            ) : (
              retailers.map((retailer) => (
                <option key={retailer._id} value={retailer._id}>
                  {retailer.name}
                </option>
              ))
            )}
          </select>
        </div>

        {stock !== null && (
          <div className="alert alert-info mb-4">
            📦 <strong>{retailers.find((r) => r._id === retailerId)?.name}</strong> currently has <strong>{stock}</strong> packets.
          </div>
        )}

        <div className="form-group mb-4">
          <label htmlFor="soldPackets" className="font-weight-bold">📦 Packets Sold</label>
          <input
            type="number"
            className="form-control"
            id="soldPackets"
            value={soldPackets}
            onChange={(e) => setSoldPackets(e.target.value)}
            placeholder="Enter number of packets sold"
          />
        </div>

        <div className="form-group mb-4">
          <label htmlFor="date" className="font-weight-bold">📅 Date</label>
          <input
            type="date"
            className="form-control"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <button type="submit" className="btn btn-primary btn-block">➕ Add Sale</button>
      </form>
    </div>
  );
};

export default SalesEntry;
