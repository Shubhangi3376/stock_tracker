import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const BASE_URL = process.env.REACT_APP_API_URL || 'https://stock-tracker-v227.onrender.com';

const RetailerList = () => {
  const [retailers, setRetailers] = useState([]);
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [location, setLocation] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchRetailers();
  }, []);

  // Fetch retailers from the backend
  const fetchRetailers = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}/api/retailers`);
      setRetailers(response.data);
    } catch (error) {
      console.error("Error fetching retailers:", error);
      alert("Failed to load retailers.");
    } finally {
      setLoading(false);
    }
  };

  // Handle form submission to add a retailer
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !contact || !location) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      const response = await axios.post(`${BASE_URL}/api/retailers/add`, { name, contact, location });
      alert(response.data.message);
      fetchRetailers();
      setName('');
      setContact('');
      setLocation('');
    } catch (error) {
      console.error("Error adding retailer:", error);
      alert("Error adding retailer. Please try again.");
    }
  };

  // Handle retailer deletion
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this retailer?")) return;

    try {
      await axios.delete(`${BASE_URL}/api/retailers/delete/${id}`);
      alert("Retailer deleted successfully.");
      fetchRetailers();
    } catch (error) {
      console.error("Error deleting retailer:", error);
      alert("Error deleting retailer. Please try again.");
    }
  };

  return (
    <div className="container-fluid px-3 mt-4">
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">Stock Tracker</a>
          <button 
            className="navbar-toggler" 
            type="button" 
            data-bs-toggle="collapse" 
            data-bs-target="#navbarNav"
            aria-controls="navbarNav" 
            aria-expanded="false" 
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item"><a className="nav-link" href="/">Retailers</a></li>
              <li className="nav-item"><a className="nav-link" href="/supply">Supply Entry</a></li>
              <li className="nav-item"><a className="nav-link" href="/sales">Sales Entry</a></li>
              <li className="nav-item"><a className="nav-link" href="/stock-summary">Stock Summary</a></li>
            </ul>
          </div>
        </div>
      </nav>

      <h2 className="text-center mt-3">Retailers List</h2>

      {/* Retailer Form */}
      <div className="row justify-content-center">
        <div className="col-md-6 col-sm-12">
          <form onSubmit={handleSubmit} className="mb-4 p-3 bg-light rounded shadow-sm">
            <div className="mb-3">
              <label className="form-label">Name</label>
              <input
                type="text"
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Contact</label>
              <input
                type="text"
                className="form-control"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Location</label>
              <input
                type="text"
                className="form-control"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">Add Retailer</button>
          </form>
        </div>
      </div>

      {/* Loading Indicator */}
      {loading && <p className="text-center text-muted">Loading retailers...</p>}

      {/* Retailer Table */}
      <div className="table-responsive">
        <table className="table table-striped table-bordered">
          <thead className="table-dark text-center">
            <tr>
              <th>Name</th>
              <th>Contact</th>
              <th>Location</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {retailers.length > 0 ? (
              retailers.map((retailer) => (
                <tr key={retailer._id}>
                  <td>{retailer.name}</td>
                  <td>{retailer.contact}</td>
                  <td>{retailer.location}</td>
                  <td>
                    <button className="btn btn-danger btn-sm" onClick={() => handleDelete(retailer._id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-muted">No retailers found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RetailerList;
