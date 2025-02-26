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


 

  return (
    <AuthContext.Provider value={{ user,username,signIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
// export const useAuth = () => useContext(AuthContext);