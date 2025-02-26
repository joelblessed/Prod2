import React, { useState } from "react";
import Sidebar from "./dasboardSidbar";
import { AuthContext } from "../../AuthContext";
import { useNavigate } from 'react-router-dom';
import { useContext } from "react";
import DashboardWidgets from "./dasboardSidbar";
import Profile from "./profile";

function Dashboard({}) {
  const { user, logout } = useContext(AuthContext);
  const [sendName, setUserName] = useState(localStorage.getItem("username" ))
  const navigate = useNavigate();

  const handleLogout = () => {
  logout()
    navigate("/")
};
  return (
    <div style={{ display: "flex" }}>
      
      <div style={{ flexGrow: 1, padding: "20px" }}>
        <h2>Dashboard</h2>
       <Profile/>
        <button onClick={handleLogout}>Logout</button>
        
      </div>
    </div>
  );
}

export default Dashboard;