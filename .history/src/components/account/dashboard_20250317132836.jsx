import React, { useState, useContext  } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { AuthContext } from "../../";

// Mock data (replace with API calls)
const mockProducts = [
  { id: 1, name: "Product A", price: 100, stock: 10 },
  { id: 2, name: "Product B", price: 200, stock: 5 },
];
const mockOrders = [
  { id: 1, product: "Product A", customer: "John Doe", status: "Shipped" },
  { id: 2, product: "Product B", customer: "Jane Smith", status: "Pending" },
];
const mockUsers = [
  { id: 1, name: "John Doe", email: "john@example.com" },
  { id: 2, name: "Jane Smith", email: "jane@example.com" },
];

const Dashboard = () => {
  const [products, setProducts] = useState(mockProducts);
  const [orders, setOrders] = useState(mockOrders);
  const [users, setUsers] = useState(mockUsers);
  const { logout } = useContext(AuthContext);

  const styles = {
    container: {
      display: "flex",
    },
    sidebar: {
      width: "240px",
      backgroundColor: "#f4f4f4",
      padding: "16px",
      height: "100vh",
      boxShadow: "2px 0 5px rgba(0, 0, 0, 0.1)",
    },
    mainContent: {
      flexGrow: 1,
      padding: "16px",
      backgroundColor: "#fff",
    },
    link: {
      textDecoration: "none",
      color: "#333",
      display: "block",
      padding: "8px 16px",
      margin: "8px 0",
      borderRadius: "4px",
      backgroundColor: "#e0e0e0",
      transition: "background-color 0.3s",
    },
    linkHover: {
      backgroundColor: "#ccc",
    },
    card: {
      backgroundColor: "#fff",
      padding: "16px",
      borderRadius: "8px",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
      marginBottom: "16px",
    },
    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
      gap: "16px",
    },
    header: {
      fontSize: "24px",
      fontWeight: "bold",
      marginBottom: "16px",
    },
  };

  return (
    <div style={styles.container}>
      {/* Sidebar */}
      <div style={styles.sidebar}>
        <h2 style={{ marginBottom: "16px" }}>Dashboard</h2>
        <nav>
          <Link to="/" style={styles.link}>
            Dashboard
          </Link>
          <Link to="/DashBoardproducts" style={styles.link}>
            Products
          </Link>
          <Link to="/orders" style={styles.link}>
            Orders
          </Link>
          <Link to="/users" style={styles.link}>
            Users
          </Link>
          <Link to="/analytics" style={styles.link}>
            Analytics
          </Link>
          <button onClick={logout}>Logout</button>
        </nav>
      </div>

      {/* Main Content */}
      <div style={styles.mainContent}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/Dashboardproducts"
            element={<DashboardProducts products={products} />}
          />
          <Route path="/orders" element={<Orders orders={orders} />} />
          <Route path="/users" element={<Users users={users} />} />
          <Route path="/analytics" element={<Analytics />} />
        </Routes>
      </div>
    </div>
  );
};

// Home Component
const Home = () => {
  const styles = {
    card: {
      backgroundColor: "#fff",
      padding: "16px",
      borderRadius: "8px",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
      marginBottom: "16px",
    },
    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
      gap: "16px",
    },
    header: {
      fontSize: "24px",
      fontWeight: "bold",
      marginBottom: "16px",
    },
  };

  return (
    <div>
      <h1 style={styles.header}>Dashboard Overview</h1>
      <div style={styles.grid}>
        <div style={styles.card}>
          <h3>Total Products</h3>
          <p>50</p>
        </div>
        <div style={styles.card}>
          <h3>Total Orders</h3>
          <p>120</p>
        </div>
        <div style={styles.card}>
          <h3>Total Users</h3>
          <p>30</p>
        </div>
      </div>
    </div>
  );
};

// Products Component
const DashboardProducts = ({ products }) => {
  const styles = {
    card: {
      backgroundColor: "#fff",
      padding: "16px",
      borderRadius: "8px",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
      marginBottom: "16px",
    },
    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
      gap: "16px",
    },
    header: {
      fontSize: "24px",
      fontWeight: "bold",
      marginBottom: "16px",
    },
  };

  return (
    <div>
      <h1 style={styles.header}>Product Management</h1>
      <div style={styles.grid}>
        {products.map((product) => (
          <div key={product.id} style={styles.card}>
            <h3>{product.name}</h3>
            <p>Price: ${product.price}</p>
            <p>Stock: {product.stock}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

// Orders Component
const Orders = ({ orders }) => {
  const styles = {
    card: {
      backgroundColor: "#fff",
      padding: "16px",
      borderRadius: "8px",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
      marginBottom: "16px",
    },
    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
      gap: "16px",
    },
    header: {
      fontSize: "24px",
      fontWeight: "bold",
      marginBottom: "16px",
    },
  };

  return (
    <div>
      <h1 style={styles.header}>Order Management</h1>
      <div style={styles.grid}>
        {orders.map((order) => (
          <div key={order.id} style={styles.card}>
            <h3>{order.product}</h3>
            <p>Customer: {order.customer}</p>
            <p>Status: {order.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

// Users Component
const Users = ({ users }) => {
  const styles = {
    card: {
      backgroundColor: "#fff",
      padding: "16px",
      borderRadius: "8px",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
      marginBottom: "16px",
    },
    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
      gap: "16px",
    },
    header: {
      fontSize: "24px",
      fontWeight: "bold",
      marginBottom: "16px",
    },
  };

  return (
    <div>
      <h1 style={styles.header}>User Management</h1>
      <div style={styles.grid}>
        {users.map((user) => (
          <div key={user.id} style={styles.card}>
            <h3>{user.name}</h3>
            <p>Email: {user.email}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

// Analytics Component
const Analytics = () => {
  const styles = {
    chartPlaceholder: {
      height: "400px",
      backgroundColor: "#f4f4f4",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "8px",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    },
    header: {
      fontSize: "24px",
      fontWeight: "bold",
      marginBottom: "16px",
    },
  };

  return (
    <div>
      <h1 style={styles.header}>Sales Analytics</h1>
      <div style={styles.chartPlaceholder}>
        <p>Chart Placeholder</p>
      </div>
    </div>
  );
};



export default Dashboard;