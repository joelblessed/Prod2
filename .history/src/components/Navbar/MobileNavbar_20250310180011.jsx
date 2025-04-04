import React, { useState, useContext } from "react";
import { AuthContext } from "../../AuthContext";
import { NavLink } from "react-router-dom";
import "./styles.css"; // Import the CSS file

function MobileNavbar({
  cartCount,
  searchTerm,
  setSearchTerm,
  search,
  categories,
}) {
  const { username, profilePicture } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <nav className="navbar">
        <button
          className="menu-toggle"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? "✖" : "☰"}
        </button>

        <h1 className="logo">ApaxT</h1>

        <div className="search-container">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <button className="search-button" onClick={search}>
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

        <div className="cart-icon-container">
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
            {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
          </NavLink>
        </div>

        <div className="account-container">
          <NavLink to="/dashboard">
            {profilePicture ? (
              <img
                src={profilePicture}
                alt="Profile"
                className="profile-image"
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

      <ul className={`mobile-menu ${isMenuOpen ? "open" : ""}`}>
        <li>
          <NavLink className="nav-link" to="/">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink className="nav-link" to="/products">
            Products
          </NavLink>
        </li>
        <li>
          <NavLink className="nav-link" to="/newProduct">
            Sell
          </NavLink>
        </li>
        <li>
          <NavLink className="nav-link" to="/category">
            <select
              className="select-dropdown"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            >
              <option value="">Category</option>
              {categories.map((category, index) => (
                <option key={index} value={category} className="option">
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