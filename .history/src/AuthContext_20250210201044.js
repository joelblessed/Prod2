import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState( localStorage.getItem("username") || '')
  const [selectedProduct, setSelectedProduct] = useState( localStorage.getItem("selectedProduct") || '')

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    const selectedProduct = localStorage.getItem("selectedProduct");
    const username = localStorage.getItem("username");
    if (token && role) {
      setUser({token, role });
    }
  }, []);

  const login = (token, role) => {
    localStorage.setItem("token", token);
    localStorage.setItem("role", role);
   
    setUser({ token, role, username });
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("username");
    setUser(null);
    setUsername(null)
  };

  return (
    <AuthContext.Provider value={{ user,username,selectedProduct login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};