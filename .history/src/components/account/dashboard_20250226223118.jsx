import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    profilePicture: "",
    walletBalance: 1000,
  });
  const [products, setProducts] = useState([
    { id: 1, name: "Product 1", price: 20, stock: 10 },
    { id: 2, name: "Product 2", price: 30, stock: 5 },
  ]);
  const [salesRecords, setSalesRecords] = useState([
    { id: 1, product: "Product 1", quantity: 2, total: 40, date: "2025-02-25" },
    { id: 2, product: "Product 2", quantity: 1, total: 30, date: "2025-02-26" },
  ]);

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

  const handleSignOut = () => {
    // Clear user session or token
    navigate("/login");
  };

  const handleProductEdit = (id, updatedProduct) => {
    setProducts(
      products.map((product) =>
        product.id === id ? { ...product, ...updatedProduct } : product
      )
    );
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
          {user.profilePicture ? (
            <img src={user.profilePicture} alt="Profile" />
          ) : (
            <span>No Profile Picture</span>
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handleProfilePictureUpload}
          />
        </div>
        <p>Name: {user.name}</p>
        <p>Email: {user.email}</p>
        <p>Wallet Balance: ${user.walletBalance}</p>
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

export default Dashboard