import React, { useState } from "react";
import Sidebar from "./dasboardSidbar";
import DashboardWidgets from "./dasboardSidbar";

function Dashboard({setUserName}) {
  // const [userName, setUserName] = useState(localStorage.getItem("username" || null))
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("username");
    localStorage.clear();
    sendName(null)
    
    
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