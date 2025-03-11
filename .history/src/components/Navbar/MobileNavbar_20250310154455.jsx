import React, { useState, useContext } from "react";
import { AuthContext } from "../../AuthContext";
import { Link, NavLink } from "react-router-dom";

// Style Objects
const styles = {
  navbar: {
    background: "#fff",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
    padding: "10px 20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    position: "fixed",
    width: "100%",
    top: 0,
    zIndex: 1000,
  },
  menuToggle: {
    fontSize: "24px",
    background: "none",
    border: "none",
    cursor: "pointer",
    transition: "0.3s",
  },
  menuToggleHover: {
    color: "#f19e39",
  },
  logo: {
    fontSize: "50px",
    fontWeight: "bold",
    color: "red",
  },
  searchContainer: {
    display: "flex",
    alignItems: "center",
    background: "#f5f5f5",
    padding: "5px",
    borderRadius: "5px",
  },
  searchInput: {
    border: "none",
    background: "transparent",
    padding: "5px",
    outline: "none",
    width: "120px",
  },
  searchButton: {
    background: "none",
    border: "none",
    cursor: "pointer",
  },
  cartIconContainer: {
    position: "relative",
    display: "flex",
    alignItems: "center",
  },
  cartCount: {
    position: "absolute",
    top: "-10px",
    right: "-5px",
    background: "red",
    color: "white",
    fontSize: "12px",
    borderRadius: "50%",
    width: "18px",
    height: "18px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  accountContainer: {
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
    fontSize: "14px",
  },
  profileImage: {
    width: "30px",
    height: "30px",
    borderRadius: "50%",
    objectFit: "cover",
    marginRight: "8px",
  },
  mobileMenu: {
    listStyle: "none",
    background: "#fff",
    position: "absolute",
    top: "60px",
    left: "0px",
    width: "40%",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
    padding: "15px",
    display: "none", // This will be controlled via state
    animation: "slideDown 0.3s ease-in-out",
  },
  mobileMenuOpen: {
    display: "block",
  },
  mobileMenuItem: {
    padding: "10px 0",
  },
  mobileMenuLink: {
    textDecoration: "none",
    color: "#333",
    fontWeight: "bold",
  },
  mobileMenuLinkHover: {
    color: "#f19e39",
  },
  navLink: {
    color: "red",
    fontSize: "20px",
  },
  select: {
    width: "60%",
    color: "red",
    background: "none",
    border: "none",
    fontWeight: "bold",
    fontSize: "20px",
    marginLeft: "-10px",
  },
  option: {
    background: "red",
    marginTop: "500px",
  },
};

// Keyframes for animation
const keyframes = `
  @keyframes slideDown {
    from {
      transform: translateY(-10px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
`;

// Inject keyframes into the document
const styleSheet = document.styleSheets[0];
styleSheet.insertRule(keyframes, styleSheet.cssRules.length);

function MobileNavbar({ cartCount, searchTerm, setSearchTerm, search, categories }) {
  const { username, profilePicture } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <nav style={styles.navbar}>
        <button
          style={styles.menuToggle}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          onMouseEnter={(e) => (e.target.style.color = styles.menuToggleHover.color)}
          onMouseLeave={(e) => (e.target.style.color = "")}
        >
          {isMenuOpen ? "✖" : "☰"}
        </button>

        <h1 style={styles.logo}>ApaxT</h1>

        <div style={styles.searchContainer}>
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={styles.searchInput}
          />
          <button onClick={search} style={styles.searchButton}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="red"
            >
              <path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" />
            </svg>
          </button>
        </div>

        <div style