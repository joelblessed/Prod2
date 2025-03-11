import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([]);
  const [salesRecords, setSalesRecords] = useState([]);
  const [profilePicture, setProfilePicture] = useState("");
  const [walletBalance, setWalletBalance] = useState(0);

  // Fetch user data on component mount
  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await fetch("/api/user");
      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
        setProducts(data.products);
        setSalesRecords(data.salesRecords);
        setWalletBalance(data.walletBalance);
      } else {
        console.error("Failed to fetch user data");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  // Handle profile picture upload
  const handleProfilePictureUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("profilePicture", file);

      try {
        const response = await fetch("/api/user/profile-picture", {
          method: "POST",
          body: formData,
        });
        if (response.ok) {
          const data = await response.json();
          setProfilePicture(data.profilePictureUrl);
        } else {
          console.error("Failed to upload profile picture");
        }
      } catch (error) {
        console.error("Error uploading profile picture:", error);
      }
    }
  };

  // Handle sign out
  const handleSignOut = async () => {
    try {
      const response = await fetch("/api/logout", {
        method: "POST",
      });
      if (response.ok) {
        navigate("/login");
      } else {
        console.error("Failed to sign out");
      }
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  // Handle product edit
  const handleProductEdit = async (productId, updatedProduct) => {
    try {
      const response = await fetch(`/api/products/${productId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedProduct),
      });
      if (response.ok) {
        const updatedProducts = products.map((product) =>
          product.id === productId ? { ...product, ...updatedProduct } : product
        );
        setProducts(updatedProducts);
      } else {
        console.error("Failed to update product");
      }
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  return (
    <div className="dashboard">
      <header>
        <h1>Dashboard</h1>
        <button onClick={handleSignOut}>Sign Out</button>
      </header>

      <section className="user-profile">
        <h2>User Profile</h2>
        <div className="profile-picture">
          {profilePicture ? (
            <img src={profilePicture} alt="Profile" />
          ) : (
            <span>No Profile Picture</span>
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handleProfilePictureUpload}
          />
        </div>
        <p>Name: {user?.name}</p>
        <p>Email: {user?.email}</p>
        <p>Wallet Balance: ${walletBalance}</p>
      </section>

      <section className="account-settings">
        <h2>Account Settings</h2>
        {/* Add form fields for updating account settings */}
      </section>

      <section className="product-preview">
        <h2>Products</h2>
        <ul>
          {products.map((product) => (
            <li key={product.id}>
              <p>{product.name}</p>
              <p>Price: ${product.price}</p>
              <p>Stock: {product.stock}</p>
              <button
                onClick={() =>
                  handleProductEdit(product.id, { price: 25, stock: 8 })
                }
              >
                Edit
              </button>
            </li>
          ))}
        </ul>
      </section>

      <section className="sales-records">
        <h2>Sales Records</h2>
        <table>
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