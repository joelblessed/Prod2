import React, { useState } from "react";
import Sidebar from "./dasboardSidbar";
import { AuthContext } from "../../AuthContext";
import DashboardWidgets from "./dasboardSidbar";

function Dashboard({}) {
  const {user}
  const [sendName, setUserName] = useState(localStorage.getItem("username" ))
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("username");
    localStorage.clear();
    setUserName(null)
    
    
};
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div style={{ flexGrow: 1, padding: "20px" }}>
        <h2>Dashboard</h2>
        <a>dw{sendName}</a>
        <button onClick={handleLogout}>Logout</button>
        
      </div>
    </div>
  );
}

export default Dashboard;