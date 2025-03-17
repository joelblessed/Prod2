import React, { useState, useEffect, useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { AuthContext } from "../../AuthContext";

const API_URL = "http://localhost:5000"; // Change to your actual API URL

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const { logout } = useContext(AuthContext);

  // Fetch data when the component mounts
  useEffect(() => {
    fetch(${API_URL}/products)
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Error fetching products:", err));

    fetch(${API_URL}/orders)
      .then((res) => res.json())
      .then((data) => setOrders(data))
      .catch((err) => console.error("Error fetching orders:", err));

    fetch(${API_URL}/users)
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error("Error fetching users:", err));
  }, []);

  return (
    <div style={{ display: "flex" }}>
      {/* Sidebar */}
      <div style={{ width: "240px", backgroundColor: "#f4f4f4", padding: "16px", height: "100vh" }}>
        <h2>Dashboard</h2>
        <nav>
          <Link to="/" style={{ display: "block", padding: "8px", backgroundColor: "#e0e0e0" }}>Dashboard</Link>
          <Link to="/DBproducts" style={{ display: "block", padding: "8px", backgroundColor: "#e0e0e0" }}>Products</Link>
          <Link to="/DBorders" style={{ display: "block", padding: "8px", backgroundColor: "#e0e0e0" }}>Orders</Link>
          <Link to="/DBusers" style={{ display: "block", padding: "8px", backgroundColor: "#e0e0e0" }}>Users</Link>
          <Link to="/DBanalytics" style={{ display: "block", padding: "8px", backgroundColor: "#e0e0e0" }}>Analytics</Link>
          <button onClick={logout}>Logout</button>
        </nav>
      </div>

      {/* Main Content */}
      <div style={{ flexGrow: 1, padding: "16px", backgroundColor: "#fff" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/DBproducts" element={<DBProducts products={products} />} />
          <Route path="/DBorders" element={<Orders orders={orders} />} />
          <Route path="/DBusers" element={<Users users={users} />} />
          <Route path="/DBanalytics" element={<Analytics />} />
        </Routes>
      </div>
    </div>
  );
};

export default Dashboard;