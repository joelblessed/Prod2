import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../AuthContext";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loadCartAfterLogin } from "../../cartAction";
import { fetchWishlist, addToWishlist } from "../../wishlistSlice";
import "./signIN.css"; // Import the CSS file

function SignIn({ api, handleLogin, add }) {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login, signIn } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [token, setToken] = useState("");
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();


  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch(`${api}/signin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier, password }),
      });

      const data = await response.json();
      if (!response.ok) {
        setError(data.message || "Login failed");
        return;
      }

      login(data.token, data.role, data.username, data);
      localStorage.setItem("userId", data.id);
   
      dispatch(loadCartAfterLogin(data.id));
      navigate("/dashboard");
    } catch (err) {
      setError("An error occurred. Please try again.");
    }
  };

  const handleWishlistmerge = async (userId) => {
    

    // Fetch both guest & user wishlists
    const guestWishlist = await fetch("http://localhost:5000/guest").then((res) => res.json());
    const userWishlist = await fetch(`http://localhost:5000/wishlist/${userId}`).then((res) => res.json());

    // Merge guest wishlist into user account
    guestWishlist.forEach((productId) => {
        if (!userWishlist.includes(productId)) {
            dispatch(addToWishlist({ productId, userId }));
        }
    });

    // Remove guest wishlist after merging
    await fetch("http://localhost:5000/removeFromWishlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: "guest", productId: "all" }),
    });

    dispatch(fetchWishlist(userId)); // Update wishlist UI
};

  return (
    <div className="signin-container">
      <h2>Login</h2>
      <form onSubmit={handleSignIn} className="signin-form">
        <div>
          <input
            type="text"
            placeholder="Enter Email or Username"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            required
          />
        </div>
        <div className="password-input-container">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="password-toggle-button"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>
        <p>
              Create account? <Link to="/signUP">Sign Up</Link>
            </p>
        <button type="submit">Login</button>
        {error && <p className="error-message">{error}</p>}
      </form>
      <button></button>
    </div>
  );
}

export default SignIn;