import { createContext,useContext,useState, useEffect } from "react";
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState( localStorage.getItem("username") || '')
  


  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    if (token && role) {
      setUser({token, role});
    }
  }, []);

  const login = (token, role, data, userid, username) => {
    localStorage.setItem("token", token);
    localStorage.setItem("role", role);
    localStorage.setItem("user", data);
    localStorage.setItem("userid",userid);
    localStorage.setItem("username", username);



    setUser({ data, token, role, username, userid });
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
    <AuthContext.Provider value={{ user,username, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
