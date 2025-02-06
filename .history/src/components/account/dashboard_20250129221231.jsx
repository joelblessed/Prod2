import React from "react";
import Sidebar from "./Sidebar";
import DashboardWidgets from "./dasboardSidbar";

function Dashboard() {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div style={{ flexGrow: 1, padding: "20px" }}>
        <h2>Dashboard</h2>
        <DashboardWidgets />
      </div>
    </div>
  );
}

export default Dashboard;