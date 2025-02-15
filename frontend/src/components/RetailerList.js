import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_URL || 'https://stock-tracker-v227.onrender.com';

const RetailerList = () => {
  const [retailers, setRetailers] = useState([]);
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [location, setLocation] = useState('');

  // Fetch retailers from the backend
  const fetchRetailers = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/retailers`);
      setRetailers(response.data);
    } catch (error) {
      console.error("Error fetching retailers:", error);
    }
  };

  useEffect(() => {
    fetchRetailers();
  }, []);

  // Handle form submission to add a retailer
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${BASE_URL}/api/retailers/add`, { name, contact, location });
      alert(response.data.message); // Show success message
      fetchRetailers(); // Fetch updated retailer list
      // Clear the form
      setName('');
      setContact('');
      setLocation('');
    } catch (error) {
      console.error("Error adding retailer:", error);
      alert("Error adding retailer");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Retailers List</h2>
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Contact</label>
          <input
            type="text"
            className="form-control"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Location</label>
          <input
            type="text"
            className="form-control"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Add Retailer</button>
      </form>

      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Contact</th>
            <th>Location</th>
          </tr>
        </thead>
        <tbody>
          {retailers.map((retailer) => (
            <tr key={retailer._id}>
              <td>{retailer.name}</td>
              <td>{retailer.contact}</td>
              <td>{retailer.location}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RetailerList;
