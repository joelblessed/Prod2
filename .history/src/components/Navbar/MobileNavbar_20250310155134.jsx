import React, { useState, useContext } from "react";
import { AuthContext } from "../../AuthContext";
import { Link, NavLink } from "react-router-dom";

function MobileNavbar({
  cartCount,
  searchTerm,
  setSearchTerm,
  search,
  categories,
}) {
  const { username, profilePicture } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
      display: isMenuOpen ? "block" : "none",
      animation: "slideDown 0.3s ease-in-out",
    },
    navLink: {
      color: "red",
      fontSize: "20px",
      textDecoration: "none",
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

  return (
    <>
      <nav style={styles.navbar}>
        <button
          style={styles.menuToggle}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
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
          <button style={styles.searchButton} onClick={search}>
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

        <div style={styles.cartIconContainer}>
          <NavLink to="/Cart">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#F19E39"
            >
              <path d="M280-80q-33 0-56.5-23.5T200-160q0-33 23.5-56.5T280-240q33 0 56.5 23.5T360-160q0 33-23.5 56.5T280-80Zm400 0q-33 0-56.5-23.5T600-160q0-33 23.5-56.5T680-240q33 0 56.5 23.5T760-160q0 33-23.5 56.5T680-80ZM246-720l96 200h280l110-200H246Zm-38-80h590q23 0 35 20.5t1 41.5L692-482q-11 20-29.5 31T622-440H324l-44 80h480v80H280q-45 0-68-39.5t-2-78.5l54-98-144-304H40v-80h130l38 80Zm134 280h280-280Z" />
            </svg>
            {cartCount > 0 && (
              <span style={styles.cartCount}>{cartCount}</span>
            )}
          </NavLink>
        </div>

        <div style={styles.accountContainer}>
          <NavLink to="/dashboard">
            {profilePicture ? (
              <img
                src={profilePicture}
                alt="Profile"
                style={styles.profileImage}
              />
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="50px"
                viewBox="0 -960 960 960"
                width="40px"
                fill="#999"
              >
                <path d="M222-255q63-44 125-67.5T480-346q71 0 133.5 23.5T739-255q44-54 62.5-109T820-480q0-145-97.5-242.5T480-820q-145 0-242.5 97.5T140-480q0 61 19 116t63 109Z" />
              </svg>
            )}
          </NavLink>
          <span>{username || "Account"}</span>
        </div>
      </nav>

      <ul style={styles.mobileMenu}>
        <li>
          <NavLink style={styles.navLink} to="/">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink style={styles.navLink} to="/products">
            Products
          </NavLink>
        </li>
        <li>
          <NavLink style={styles.navLink} to="/newProduct">
            Sell
          </NavLink>
        </li>
        <li>
          <NavLink style={styles.navLink} to="/category">
            <select
              style={styles.select}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            >
              <option value="">Category</option>
              {categories.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </NavLink>
        </li>
      </ul>
    </>
  );
}

export default MobileNavbar;