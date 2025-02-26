import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../AuthContext";

import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loadCartAfterLogin } from "../../cartAction";


function SignIn({api, handleSignIn, add}) {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login, signIn } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [token, setToken] = useState("")
  const [user, setUser] = useState(])
  const navigate = useNavigate();
  const dispatch = useDispatch(); 


  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  useEffect(()=>{
    if(user != null){
      handleSignIn(user)
    }
  },[user]);



  const handleLogin = async (e) => {
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

      login(data.token, data.role, data)
       console.log(localStorage.getItem("token"))
      dispatch(loadCartAfterLogin(data));
      navigate("/dashboard");
    
    } catch (err) {
      setError("An error occurred. Please try again.");
    }
  };

// ///////////////////



  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setError("Sign In");
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

 
  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
        <input
          type="text"
          placeholder="Enter Email or Username"
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
          required
        />
        </div>
        <div style={{ position: "relative", width: "fit-content" }}>
      <input
        type={showPassword ? "text" : "password"}
        placeholder="Enter password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ paddingRight: "50px" }} // Space for the icon
      />
      <button
        type="button"
        onClick={() => setShowPassword((prev) => !prev)}
        style={{
          position: "absolute",
          right: "5px",
          top: "50%",
          transform: "translateY(-50%)",
          background: "none",
          border: "none",
          cursor: "pointer",
        }}
      >
        {showPassword ? "Hide" : "Show"}
      </button>
    </div>
        <button type="submit">Login</button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </div>
  );
}

export default SignIn;