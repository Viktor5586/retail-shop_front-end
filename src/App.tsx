import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import CustomerList from './components/customers/CustomerList';
import AddCustomerPage from './components/customers/AddCustomerPage';
import CustomerOrdersPage from './components/customers/CustomerOrdersPage';
import EditCustomerPage from './components/customers/EditCustomerPage';

const App: React.FC = () => {
  return (
    <Router>
      <MainLayout />
    </Router>
  );
};

const MainLayout: React.FC = () => {
  const location = useLocation();

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">Retail Shop</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname === '/' ? 'active' : ''}`} to="/">Customers</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<CustomerList />} />
          <Route path="/add-customer" element={<AddCustomerPage />} />
          <Route path="/edit-customer/:customerId" element={<EditCustomerPage />} />
          <Route path="/orders/:customerId" element={<CustomerOrdersPage />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;