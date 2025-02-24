import React, { useState, useContext } from "react";
import { AuthContext } from "../../AuthContext";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loadCartAfterLogin } from "../../cartAction";


function SignIn({api}) {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch(); 


  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };


// const syncCartAfterLogin = async (userId) => {
//   let guestCart = JSON.parse(localStorage.getItem("guestCart")) || [];

//   if (guestCart.length > 0) {
//     // Fetch user's cart from the database
//     let userCart = await fetch(`${api}/addToCart/${userId}`).then(res => res.json());

//     // Merge guest cart with user cart (avoid duplicates)
//     let mergedCart = [...userCart, ...guestCart.filter(gc => !userCart.find(uc => uc.id === gc.id))];

//     // Save merged cart to database
//     await fetch(`${api}/addToCart/${userId}`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(mergedCart)
//     });

//     // Clear guest cart from localStorage
//     localStorage.removeItem("guestCart");
//   }
// }

// 


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

      login(data.token, data.role, data);
       set(data.token)
      dispatch(loadCartAfterLogin(data));
      navigate("/dashboard");
    } catch (err) {
      setError("An error occurred. Please try again.");
    }
  };

  useEffect(() => {
    fetch(`${api}/profile`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `b`, // Replace with actual token
        },
    })
        .then(response => {
            if (!response.ok) {
                throw new Error("Unauthorized or Failed to fetch");
            }
            return response.json();
        })
        .then(data => {
            setData(data.slice(0, 5)); // Store first 5 items
            setLoading(false);
        })
        .catch(error => console.error("Error fetching data:", error));
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