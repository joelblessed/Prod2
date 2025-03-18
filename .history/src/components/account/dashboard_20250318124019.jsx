import React, { useState, useEffect, useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { AuthContext } from "../../AuthContext";
import { useDispatch } from "react-redux";

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

// Shared Styles
const sharedStyles = {
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

const Dashboard = ({ api }) => {
  const [orders, setOrders] = useState(mockOrders);
  const [users, setUsers] = useState(mockUsers);
  const { logout } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const ownerId = localStorage.getItem("userId");

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
      ":hover": {
        backgroundColor: "#ccc",
      },
    },
    logoutButton: {
      width: "100%",
      padding: "8px 16px",
      margin: "8px 0",
      borderRadius: "4px",
      backgroundColor: "#ff4444",
      color: "#fff",
      border: "none",
      cursor: "pointer",
      transition: "background-color 0.3s",
      ":hover": {
        backgroundColor: "#cc0000",
      },
    },
  };
  useEffect(() => {
    // Fetch products from the backend
    fetch(`${api}/products?ownerId=${ownerId}`)
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, [ownerId]);

  if (loading) {
    return <p>Loading...</p>;
  }

  // Delete product by ID
  const handleDelete = (id) => {
    fetch(`${api}/deleteProduct/${id}`, { method: "DELETE" })
      .then((res) => {
        if (res.ok) {
          setProducts(products.filter((product) => product.id !== id)); // Remove from state
        } else {
          console.error("Error deleting product");
        }
      })
      .catch((err) => console.error("Error deleting product:", err));
  };

  return (
    <div style={styles.container}>
      {/* Sidebar */}
      <div style={styles.sidebar}>
        <h2 style={{ marginBottom: "16px" }}>Dashboard</h2>
        <nav>
          <Link to="/d" style={styles.link}>
            Dashboard
          </Link>
          <Link to="/dprofile" style={styles.link}>
            profile
          </Link>
          <Link to="/dproducts" style={styles.link}>
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
          <button onClick={logout} style={styles.logoutButton}>
            Logout
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div style={styles.mainContent}>
        <Routes>
          <Route
            path="/d"
            element={<Home products={products} orders={orders} users={users} />}
          />
          <Route
            path="/dproducts"
            element={
              <Products products={products} handleDelete={handleDelete} />
            }
          />
          <Route path="/orders" element={<Orders orders={orders} />} />
          <Route path="/users" element={<Users users={users} />} />
          <Route
            path="/dprofile"
            element={
              <Profile users={users} api={api} useDispatch={useDispatch} />
            }
          />
          <Route path="/analytics" element={<Analytics />} />
        </Routes>
      </div>
    </div>
  );
};

// Home Component
const Home = ({ products, orders, users }) => {
  return (
    <div>
      <h1 style={sharedStyles.header}>Dashboard Overview</h1>
      <div style={sharedStyles.grid}>
        <div style={sharedStyles.card}>
          <h3>Total Products</h3>
          <p>{products.length}</p>
        </div>
        <div style={sharedStyles.card}>
          <h3>Total Orders</h3>
          <p>{orders.length}</p>
        </div>
        {/* <div style={sharedStyles.card}>
          <h3>Total Users</h3>
          <p>{users.length}</p>
        </div> */}
      </div>
    </div>
  );
};

// Products Component
const Products = ({ products, api, handleDelete }) => {
  return (
    <div>
      <h1 style={sharedStyles.header}>Product Management</h1>
      <div style={sharedStyles.grid}>
        {products.map((product) => (
          <div key={product.id} style={sharedStyles.card}>
            <img
              src={product.images[0]}
              alt="loading..."
              style={{ width: "100px", height: "100px" }}
            />
            <h3>{product.name}</h3>
            <p>Price: ${product.price}</p>
            <p>Stock: {product.numberInStock}</p>

            <div>
              {" "}
              <Link
                style={{
                  border: "1px solid green",
                  padding: "10px",
                  borderRadius: "10px",
                  color: "green",
                  fontSize: "15px",
                  fontWeight: "bold",
                }}
                to={`/editProduct/${product.id}`}
              >
                Edit Product
              </Link>
              <button
                onClick={() => handleDelete(product.id)}
                style={{
                  border: "1px solid red",
                  background: "none",
                  padding: "10px",
                  borderRadius: "10px",
                  color: "red",
                  fontSize: "15px",
                  fontWeight: "bold",
                }}
              >
                Delete Product
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Orders Component
const Orders = ({ orders }) => {
  return (
    <div>
      <h1 style={sharedStyles.header}>Order Management</h1>
      <div style={sharedStyles.grid}>
        {orders.map((order) => (
          <div key={order.id} style={sharedStyles.card}>
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
  return (
    <div>
      <h1 style={sharedStyles.header}>User Management</h1>
      <div style={sharedStyles.grid}>
        {users.map((user) => (
          <div key={user.id} style={sharedStyles.card}>
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
  };

  return (
    <div>
      <h1 style={sharedStyles.header}>Sales Analytics</h1>
      <div style={styles.chartPlaceholder}>
        <p>Chart Placeholder</p>
      </div>
    </div>
  );
};

const Profile = ({ api, useDispatch }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const [imageError, setiImageError] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setError("No token found");
      return;
    }

    fetch(`${api}/profile`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Add token in the headers
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        return response.json();
      })
      .then((data) => {
        setUser(data);
        localStorage.setItem("userData", JSON.stringify(data));
        localStorage.setItem("username", data.userName);
        localStorage.setItem("profileImage", data.profileImage);
        localStorage.setItem("userData", JSON.stringify(data));
        localStorage.setItem("rawUserData", data);
      })

      .catch((error) => setError(error.message));
  }, []);

  if (error) return <p>Error: {error}</p>;
  if (!user) return <p>Loading...</p>;

  return (
    <>
      <div style={styles.profileContainer}>
        <h2>User Profile</h2>
        <div>
          {imageError ?
        </div>
        <img
          src={user.profileImage || "public/images/svgviewer-output(2).svg"}
          alt="Profile"
          style={styles.profileImage}
        />

        <p>
          <strong>Username:</strong> {user.userName}
        </p>
        <p>
          <strong>Full Name:</strong> {user.fullName}
        </p>
        <p>
          <strong>Phone:</strong> {user.phone}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <p>
          <strong>Country:</strong> {user.country}
        </p>
        <p>
          <strong>Address:</strong> {user.address}
        </p>

        <div>
          {" "}
          <Link
            style={{
              border: "1px solid green",
              padding: "10px",
              borderRadius: "10px",
              color: "green",
              fontSize: "15px",
              fontWeight: "bold",
            }}
            to={`/editProfile`}
          >
            Edit Profile
          </Link>
        </div>
      </div>
    </>
  );
};

const styles = {
  profileContainer: {
    maxWidth: "1000px",
    margin: "0 auto",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    backgroundColor: "#f9f9f9",
  },
  profileImage: {
    width: "150px",
    height: "150px",
    borderRadius: "50%",
    marginBottom: "20px",
  },
};

export default Dashboard;
