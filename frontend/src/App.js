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
