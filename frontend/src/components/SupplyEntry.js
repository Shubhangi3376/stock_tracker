import React, { useState, useEffect } from "react";
import axios from "axios";

const SupplyEntry = () => {
  const [retailerId, setRetailerId] = useState("");
  const [suppliedPackets, setSuppliedPackets] = useState("");
  const [retailers, setRetailers] = useState([]);
  const [stock, setStock] = useState(null); // Track current stock
  const [date, setDate] = useState(""); // Store date field

  const backendUrl = "https://stock-tracker-v227.onrender.com"; // Backend URL https://stock-tracker-v227.onrender.com/

  // Fetch retailers from backend
  useEffect(() => {
    const fetchRetailers = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/retailers`);
        setRetailers(response.data);
      } catch (error) {
        console.error("Error fetching retailers:", error);
        alert("Failed to load retailers. Please check backend.");
      }
    };
    fetchRetailers();
  }, []);

  // Fetch stock when retailer is selected
  useEffect(() => {
    if (retailerId) {
      const fetchStock = async () => {
        try {
          const response = await axios.get(`${backendUrl}/api/stock/${retailerId}`);
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
  }, [retailerId]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!retailerId || !suppliedPackets || !date) {
      alert("⚠️ Please fill out all fields.");
      return;
    }

    if (suppliedPackets <= 0) {
      alert("⚠️ Supplied packets must be a positive number.");
      return;
    }

    try {
      await axios.post(`${backendUrl}/api/supply/add`, {
        retailerId,
        suppliedPackets,
        date,
      });

      alert("✅ Supply entry added successfully!");
      setRetailerId("");
      setSuppliedPackets("");
      setDate("");
      setStock(null);
    } catch (error) {
      console.error("Error adding supply:", error);
      alert("❌ Failed to add supply entry.");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">🚚 Supply Entry</h2>

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

        {/* Show stock information if retailer is selected */}
        {stock !== null && (
          <div className="alert alert-info mb-4">
            📦 <strong>{retailers.find((r) => r._id === retailerId)?.name}</strong> currently has <strong>{stock}</strong> packets.
          </div>
        )}

        <div className="form-group mb-4">
          <label htmlFor="suppliedPackets" className="font-weight-bold">📦 Packets Supplied</label>
          <input
            type="number"
            className="form-control"
            id="suppliedPackets"
            value={suppliedPackets}
            onChange={(e) => setSuppliedPackets(e.target.value)}
            placeholder="Enter number of packets"
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

        <button type="submit" className="btn btn-primary btn-block">➕ Add Supply</button>
      </form>
    </div>
  );
};

export default SupplyEntry;
