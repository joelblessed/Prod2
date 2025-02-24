import { createContext,useContext,useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { syncCartWithServer } from "./cartSlice";
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();
  const [username, setUsername] = useState( localStorage.getItem("username") || '')
  


  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    const userData = localStorage.getItem("userData");

    const selectedProduct = localStorage.getItem("selectedProduct");
    const username = localStorage.getItem("username");
    if (token && role) {
      setUser({token, role, userData });
    }
  }, []);

  const login = (token, role, data) => {
    localStorage.setItem("token", token);
    localStorage.setItem("role", role);
    localStorage.setItem("user", data);

    setUser({ data, token, role, username });
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("user");
    localStorage.removeItem("userData");
    localStorage.removeItem("username");
    setUser(null);
    setUsername(null)
  };


  const signIn = async (userData) => {
    setUser(userData);

    // Fetch user cart from backend
    const response = await fetch(`/cart.json?userId=${userData.id}`);
    const userCart = await response.json();

    // Merge localStorage cart with server cart
    const localCart = JSON.parse(localStorage.getItem("cart")) || [];
    const mergedCart = [...new Set([...userCart, ...localCart])];

    // Sync with Redux and server
    dispatch(syncCartWithServer(mergedCart));
    localStorage.setItem("cart", JSON.stringify(mergedCart));

    // Save updated cart to backend
    await fetch(`/cart.json`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: userData.id, cart: mergedCart }),
    });
  };

  return (
    <AuthContext.Provider value={{ user,username,signIn login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};