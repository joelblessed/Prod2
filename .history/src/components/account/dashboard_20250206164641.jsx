import React, { useState } from "react";
import Sidebar from "./dasboardSidbar";
import DashboardWidgets from "./dasboardSidbar";

function Dashboard({api}) {
  const [userName, setUserName] = useState(localStorage.getItem("user"))
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
        <button onClick={handleLogout}>Logout</button>
        <DashboardWidgets />
      </div>
    </div>
  );
}

export default Dashboard;