import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import RetailerList from './components/RetailerList';
import SupplyEntry from './components/SupplyEntry';
import SalesEntry from './components/SalesEntry';
import StockSummary from './components/StockSummary';

const App = () => {
  return (
    <Router>
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <a className="navbar-brand" href="/">Stock Tracker</a>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link" href="/">Retailers</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/supply">Supply Entry</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/sales">Sales Entry</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/stock-summary">Stock Summary</a>
              </li>
            </ul>
          </div>
        </nav>

        <div className="container mt-5">
          <Routes>
            <Route path="/" element={<RetailerList />} />
            <Route path="/supply" element={<SupplyEntry />} />
            <Route path="/sales" element={<SalesEntry />} />
            <Route path="/stock-summary" element={<StockSummary />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
