import { useContext, useState } from "react";
import "./DesktopNavbar.css";
import { Link, NavLink } from "react-router-dom";
import { AuthContext, AuthProvider } from "../Authentication";

function DesktopNavbar({
  cart,
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
}) {
  const { user, logout } = useContext(AuthContext);

  const totalItems = cart.reduce((total, item) => total + item.forCount, 0);

  // const [isMenuOpen, setIsMenuOpen] = useState(false);

  // const toggleMenu = () => {
  //     setIsMenuOpen(!isMenuOpen);
  // };

  return (
    <nav className="desktop-navbar">
      <ul>
        <li className="navbar-logo" style={{ marginTop: "-10px" }}>
          <h1>ApaxT</h1>
        </li>

        <li className="Desk-search" style={{ marginTop: "1px" }}>
          <input
            className="Desk-searchbar"
            style={{
              borderRadius: "10px",
              border: "none",
              height: "40px",
              width: "300px",
            }}
            placeholder="search"
            type="text"
            value={searchTerm}
            defaultValue=""
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </li>

        <li>
          <NavLink to="/" actiiveClassName="active" exact>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/products" actiiveClassName="active">
            Products
          </NavLink>
        </li>

        <li href="#" style={{ width: "auto" }}>
          {" "}
          <NavLink to="/category">
            <select
              defaultValue="All"
              style={{
                width: "auto",
                border: "0px",
                background: "none",
                backgroundColor: "none",
                color: "black",
                cursor: "pointer",
              }}
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="All">Category</option>
              <option value="phone">Phones</option>
              <option value="computer">Computers</option>
              <option value="accesseries">Accesseries</option>
              <option value="farm">Farm</option>
              <option value="others">Others</option>
            </select>
          </NavLink>{" "}
        </li>

        <li>
          <NavLink to="/newProduct" actiiveClassName="active">
            Sell
          </NavLink>
        </li>

        <li style={{ width: "100px" }} href="#">
          <NavLink to="/Cart2" actiiveClassName="active">
            <div style={{ marginTop: "-40px" }}>
              <div style={{ display: "grid", background: "" }}>
                <div
                  style={{
                    position: "absolute",
                    top: "-10px",
                    marginLeft: "9px",
                  }}
                >
                  <label style={{ color: "blue", fontWeight: "bold" }}>
                    {totalItems}
                  </label>
                </div>
                <div
                  style={{
                    display: "flex",
                    background: "",
                    margin: "0px",
                    padding: "0px",
                  }}
                >
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="25px"
                      viewBox="0 -960 960 960"
                      width="25px"
                      fill="#F19E39"
                    >
                      <path d="M280-80q-33 0-56.5-23.5T200-160q0-33 23.5-56.5T280-240q33 0 56.5 23.5T360-160q0 33-23.5 56.5T280-80Zm400 0q-33 0-56.5-23.5T600-160q0-33 23.5-56.5T680-240q33 0 56.5 23.5T760-160q0 33-23.5 56.5T680-80ZM246-720l96 200h280l110-200H246Zm-38-80h590q23 0 35 20.5t1 41.5L692-482q-11 20-29.5 31T622-440H324l-44 80h480v80H280q-45 0-68-39.5t-2-78.5l54-98-144-304H40v-80h130l38 80Zm134 280h280-280Z" />
                    </svg>
                  </div>
                  <div>
                    <a>cart</a>
                  </div>
                </div>
              </div>
            </div>
          </NavLink>
        </li>
        <li href="#">
          <NavLink to="/dashboard" actiiveClassName="active">
        
            <div
              style={{ background: "", marginTop: "-45px", marginRight: "0px" }}
            >
              <div>
              {user ?(
            <>
            </>
          )}
               
              </div>
            </div>
          </NavLink>
        </li>
      </ul>

      {/* <button className="menu-toggle" onClick={toggleMenu}>
                {isMenuOpen ? "✖" : "☰"}
            </button> */}
    </nav>
  );
}

export default DesktopNavbar;
