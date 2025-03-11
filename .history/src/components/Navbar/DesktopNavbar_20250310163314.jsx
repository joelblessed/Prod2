import { useContext } from "react";
import { AuthContext } from "../../AuthContext";
import { NavLink } from "react-router-dom";

// Keyframes for animations
const fadeInKeyframes = `
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const bounceKeyframes = `
  @keyframes bounce {
    0%, 100% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.2);
    }
  }
`;

// Inline styles
const styles = {
  navbar: {
    background: "#fff",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
    padding: "10px 20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    position: "sticky",
    top: 0,
    zIndex: 1000,
    animation: "fadeIn 0.5s ease-in-out",
  },
  navList: {
    listStyle: "none",
    display: "flex",
    alignItems: "center",
    gap: "20px",
    padding: 0,
    margin: 0,
  },
  navItem: {
    position: "relative",
    transition: "transform 0.3s ease-in-out",
    ":hover": {
      transform: "scale(1.1)",
    },
  },
  navLogo: {
    fontSize: "64px",
    fontWeight: "bold",
    color: "red",
  },
  searchBox: {
    display: "flex",
    alignItems: "center",
    background: "#f1f1f1",
    borderRadius: "5px",
    padding: "5px",
    width: "250px",
  },
  searchInput: {
    border: "none",
    background: "transparent",
    outline: "none",
    padding: "5px",
    flex: 1,
  },
  searchButton: {
    background: "none",
    border: "none",
    cursor: "pointer",
    transition: "transform 0.2s ease-in-out",
    ":hover": {
      transform: "scale(1.2)",
    },
  },
  navLink: {
    textDecoration: "none",
    color: "red",
    fontWeight: 500,
    fontSize: "20px",
    padding: "10px 15px",
    transition: "color 0.3s ease-in-out",
    ":hover": {
      color: "#ff6600",
    },
    "&.active": {
      color: "#ff6600",
    },
  },
  cartContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    position: "relative",
  },
  cartBadge: {
    background: "red",
    color: "white",
    fontSize: "12px",
    fontWeight: "bold",
    padding: "2px 6px",
    borderRadius: "50%",
    position: "absolute",
    top: "-10px",
    right: "-10px",
    animation: "bounce 0.5s ease-in-out",
  },
  accountContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  accountName: {
    fontSize: "12px",
    marginTop: "5px",
    color: "#333",
    opacity: 1,
    transition: "opacity 0.3s ease-in-out",
  },
  accountContainerHover: {
    opacity: 1,
  },
  select: {
    color: "red",
    border: "none",
    background: "none",
    ":hover": {
      color: "#ff6600",
    },
    "&.active": {
      color: "#ff6600",
    },
  },
  option: {
    ":hover": {
      color: "#ff6600",
    },
    "&.active": {
      color: "#ff6600",
    },
  },
};

function DesktopNavbar({
  cartCount,
  searchTerm,
  setSearchTerm,
  categories,
  search,
}) {
  const { username } = useContext(AuthContext);

  return (
    <>
      <style>
        {fadeInKeyframes}
        {bounceKeyframes}
      </style>
      <nav style={styles.navbar}>
        <h1 style={styles.navLogo}>ApaxT</h1>

        <div style={styles.searchBox}>
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
              height="20px"
              viewBox="0 -960 960 960"
              width="20px"
              fill="red"
            >
              <path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" />
            </svg>
          </button>
        </div>

        <ul style={styles.navList}>
          <li style={styles.navItem}>
            <NavLink style={styles.navLink} to="/" exact>
              Home
            </NavLink>
          </li>
          <li style={styles.navItem}>
            <NavLink style={styles.navLink} to="/products">
              Products
            </NavLink>
          </li>
          <li style={styles.navItem}>
            <NavLink style={styles.navLink} to="/formUpload">
              Sell
            </NavLink>
          </li>
          <li style={styles.navItem}>
            <NavLink style={styles.navLink} to="/category">
              <select
                style={styles.select}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              >
                <option value="">Category</option>
                {categories.map((category, index) => (
                  <option key={index} value={category} style={styles.option}>
                    {category}
                  </option>
                ))}
              </select>
            </NavLink>
          </li>
          <li style={styles.navItem}>
            <NavLink style={styles.navLink} to="/cart">
              <div style={styles.cartContainer}>
                {cartCount > 0 && (
                  <span style={styles.cartBadge}>{cartCount}</span>
                )}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 -960 960 960"
                  width="24px"
                  fill="#F19E39"
                >
                  <path d="M280-80q-33 0-56.5-23.5T200-160q0-33 23.5-56.5T280-240q33 0 56.5 23.5T360-160q0 33-23.5 56.5T280-80Zm400 0q-33 0-56.5-23.5T600-160q0-33 23.5-56.5T680-240q33 0 56.5 23.5T760-160q0 33-23.5 56.5T680-80ZM246-720l96 200h280l110-200H246Zm-38-80h590q23 0 35 20.5t1 41.5L692-482q-11 20-29.5 31T622-440H324l-44 80h480v80H280q-45 0-68-39.5t-2-78.5l54-98-144-304H40v-80h130l38 80Zm134 280h280-280Z" />
                </svg>
              </div>
            </NavLink>
          </li>
          <li style={styles.navItem}>
            <NavLink style={styles.navLink} to="/dashboard">
              <div style={styles.accountContainer}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="30px"
                  viewBox="0 -960 960 960"
                  width="30px"
                  fill="#999"
                >
                  <path d="M222-255q63-44 125-67.5T480-346q71 0 133.5 23.5T739-255q44-54 62.5-109T820-480q0-145-97.5-242.5T480-820q-145 0-242.5 97.5T140-480q0 61 19 116t63 109Z" />
                </svg>
                <span style={styles.accountName}>{username || "Account"}</span>
              </div>
            </NavLink>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default DesktopNavbar;