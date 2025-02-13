import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../../AuthContext";
import { useContext } from "react";

function SignIN({ api }) {
  const { user, login } = useContext(AuthContext);
  const [identifier, setIdentifier] = useState(""); // Can be email or username
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();


  const syncCartAfterLogin = async (userId) => {
    let guestCart = JSON.parse(localStorage.getItem("guestCart")) || [];
  
    if (guestCart.length > 0) {
      // Fetch user's cart from the database
      let userCart = await fetch(`${/cart/${userId}`).then(res => res.json());
  
      // Merge guest cart with user cart (avoid duplicates)
      let mergedCart = [...userCart, ...guestCart.filter(gc => !userCart.find(uc => uc.id === gc.id))];
  
      // Save merged cart to database
      await fetch(`/api/cart/${userId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(mergedCart)
      });
  
      // Clear guest cart from localStorage
      localStorage.removeItem("guestCart");
    }
  }

 
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch(`${api}/signin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier, password }), // Send identifier (email or username)
      });

      const data = await response.json();
      setLoading(false);

      if (!response.ok) {
        setError(data.message || "Login failed");
        return;
      }

      localStorage.setItem("token", data.token); // Store JWT token
      login(data.token, data.role);
      syncCartAfterLogin(data.userId);
      toast.success("Success");
      localStorage.setItem("username", identifier);
      localStorage.setItem("userrole", response.role);

      navigate("/");
      window.location.reload();
    } catch (err) {
      setLoading(false);
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Enter Email or Username"
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </div>
  );
}

export default SignIN;
