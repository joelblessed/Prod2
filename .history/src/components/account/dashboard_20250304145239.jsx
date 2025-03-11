import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../AuthContext";
import "./dashboard.css"

const Dashboard = ({api}) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([]);
  const [salesRecords, setSalesRecords] = useState([]);
  const [profilePicture, setProfilePicture] = useState("");
  const [walletBalance, setWalletBalance] = useState(0);
  const [error, setError] = useState(null);

  const { logout } = useContext(AuthContext);

  // Fetch user data on component mount
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
        console.log(localStorage.getItem("userData"));
  
      })

      .catch((error) => setError(error.message));
  }, []);


  if (error) return <p>Error: {error}</p>;
  if (!user) return <p>Loading...</p>;


 

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
    <div style={{marginTop:"90PX"}} className="dashboard">
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
        <p>Name: {user?.userName}</p>
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