import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./dash"

const Dashboard = () => {
  const navigate = useNavigate();

  // State for user data
  const [user, setUser] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    profilePicture: "",
    walletBalance: 1000,
  });

  // State for products
  const [products, setProducts] = useState([]);

  // State for sales records
  const [salesRecords, setSalesRecords] = useState([]);

  // Fetch products and sales records on component mount
  useEffect(() => {
    // Fetch products
    fetch("https://jsonplaceholder.typicode.com/posts") // Replace with your API endpoint
      .then((response) => response.json())
      .then((data) => {
        const mockProducts = data.slice(0, 5).map((item, index) => ({
          id: index + 1,
          name: `Product ${index + 1}`,
          price: Math.floor(Math.random() * 100) + 1,
          stock: Math.floor(Math.random() * 50) + 1,
        }));
        setProducts(mockProducts);
      })
      .catch((error) => console.error("Error fetching products:", error));

    // Fetch sales records
    fetch("https://jsonplaceholder.typicode.com/comments") // Replace with your API endpoint
      .then((response) => response.json())
      .then((data) => {
        const mockSales = data.slice(0, 5).map((item, index) => ({
          id: index + 1,
          product: `Product ${index + 1}`,
          quantity: Math.floor(Math.random() * 10) + 1,
          total: Math.floor(Math.random() * 100) + 1,
          date: new Date().toISOString().split("T")[0],
        }));
        setSalesRecords(mockSales);
      })
      .catch((error) => console.error("Error fetching sales records:", error));
  }, []);

  // Handle profile picture upload
  const handleProfilePictureUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUser({ ...user, profilePicture: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle sign out
  const handleSignOut = () => {
    // Clear user session or token
    localStorage.removeItem("token"); // Example: Remove token from localStorage
    navigate("/login");
  };

  // Handle product edit
  const handleProductEdit = (id, updatedProduct) => {
    setProducts(
      products.map((product) =>
        product.id === id ? { ...product, ...updatedProduct } : product
      )
    );
  };

  // Handle wallet recharge
  const handleRechargeWallet = () => {
    const amount = prompt("Enter amount to recharge:");
    if (amount && !isNaN(amount)) {
      setUser({ ...user, walletBalance: user.walletBalance + parseFloat(amount) });
    } else {
      alert("Invalid amount!");
    }
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Welcome, {user.name}</h1>
        <button onClick={handleSignOut} className="sign-out-button">
          Sign Out
        </button>
      </header>

      {/* User Profile Section */}
      <section className="user-profile">
        <h2>User Profile</h2>
        <div className="profile-picture">
          {user.profilePicture ? (
            <img src={user.profilePicture} alt="Profile" className="profile-image" />
          ) : (
            <span>No Profile Picture</span>
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handleProfilePictureUpload}
            className="upload-input"
          />
        </div>
        <p>Name: {user.name}</p>
        <p>Email: {user.email}</p>
        <p>Wallet Balance: ${user.walletBalance}</p>
        <button onClick={handleRechargeWallet} className="recharge-button">
          Recharge Wallet
        </button>
      </section>

      {/* Account Settings Section */}
      <section className="account-settings">
        <h2>Account Settings</h2>
        <form>
          <label>
            Name:
            <input
              type="text"
              value={user.name}
              onChange={(e) => setUser({ ...user, name: e.target.value })}
            />
          </label>
          <label>
            Email:
            <input
              type="email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
          </label>
          <button type="submit">Save Changes</button>
        </form>
      </section>

      {/* Product Preview Section */}
      <section className="product-preview">
        <h2>Products</h2>
        <ul className="product-list">
          {products.map((product) => (
            <li key={product.id} className="product-item">
              <p>{product.name}</p>
              <p>Price: ${product.price}</p>
              <p>Stock: {product.stock}</p>
              <button
                onClick={() =>
                  handleProductEdit(product.id, { price: 25, stock: 8 })
                }
                className="edit-button"
              >
                Edit
              </button>
            </li>
          ))}
        </ul>
      </section>

      {/* Sales Records Section */}
      <section className="sales-records">
        <h2>Sales Records</h2>
        <table className="sales-table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Quantity</th>
              <th>Total</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {salesRecords.map((record) => (
              <tr key={record.id}>
                <td>{record.product}</td>
                <td>{record.quantity}</td>
                <td>${record.total}</td>
                <td>{record.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default Dashboard;