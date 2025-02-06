import React from "react";
import Sidebar from "./dasboardSidbar";
import DashboardWidgets from "./dasboardSidbar";

function Dashboard() {
  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
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