import { useContext } from "react";
import { AuthContext } from "../../AuthContext";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const Navbar = styled.nav`
  background: #fff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: sticky;
  top: 0;
  z-index: 1000;
`;

const NavList = styled.ul`
  list-style: none;
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 0;
  margin: 0;
`;

const NavItem = styled.li`
  position: relative;
`;

const NavLogo = styled.h1`
  font-size: 24px;
  font-weight: bold;
  color: #333;
`;

const SearchBox = styled.div`
  display: flex;
  align-items: center;
  background: #f1f1f1;
  border-radius: 5px;
  padding: 5px;
  width: 250px;
`;

const SearchInput = styled.input`
  border: none;
  background: transparent;
  outline: none;
  padding: 5px;
  flex: 1;
`;

const SearchButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
`;

const NavLinkStyled = styled(NavLink)`
  text-decoration: none;
  color: #333;
  font-weight: 500;
  padding: 10px 15px;
  transition: 0.3s ease-in-out;
  
  &:hover, &.active {
    color: #ff6600;
  }
`;

const CartContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

const CartBadge = styled.span`
  background: red;
  color: white;
  font-size: 12px;
  font-weight: bold;
  padding: 2px 6px;
  border-radius: 50%;
  position: absolute;
  top: -10px;
  right: -10px;
`;

const AccountContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const AccountName = styled.span`
  font-size: 12px;
  margin-top: 5px;
  color: #333;
`;

function DesktopNavbar({ cartCount, searchTerm, setSearchTerm, categories }) {
  const { username } = useContext(AuthContext);

  return (
    <Navbar>
      <NavLogo>ApaxT</NavLogo>

      <SearchBox>
        <SearchInput
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <SearchButton>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="20px"
            viewBox="0 -960 960 960"
            width="20px"
            fill="red"
          >
            <path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" />
          </svg>
        </SearchButton>
      </SearchBox>

      <NavList>
        <NavItem>
          <NavLinkStyled to="/" exact>Home</NavLinkStyled>
        </NavItem>
        <NavItem>
          <NavLinkStyled to="/products">Products</NavLinkStyled>
        </NavItem>
        <NavItem>
          <NavLinkStyled to="/formUpload">Sell</NavLinkStyled>
        </NavItem>
        <NavItem>
          <NavLinkStyled to="/category">
            <select
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            >
              <option value="">Category</option>
              {categories.map((category, index) => (
                <option key={index} value={category}>{category}</option>
              ))}
            </select>
          </NavLinkStyled>
        </NavItem>
        <NavItem>
          <NavLinkStyled to="/cart">
            <CartContainer>
              {cartCount > 0 && <CartBadge>{cartCount}</CartBadge>}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="25px"
                viewBox="0 -960 960 960"
                width="25px"
                fill="#F19E39"
              >
                <path d="M280-80q-33 0-56.5-23.5T200-160q0-33 23.5-56.5T280-240q33 0 56.5 23.5T360-160q0 33-23.5 56.5T280-80Zm400 0q-33 0-56.5-23.5T600-160q0-33 23.5-56.5T680-240q33 0 56.5 23.5T760-160q0 33-23.5 56.5T680-80ZM246-720l96 200h280l110-200H246Zm-38-80h590q23 0 35 20.5t1 41.5L692-482q-11 20-29.5 31T622-440H324l-44 80h480v80H280q-45 0-68-39.5t-2-78.5l54-98-144-304H40v-80h130l38 80Zm134 280h280-280Z" />
              </svg>
            </CartContainer>
          </NavLinkStyled>
        </NavItem>
        <NavItem>
          <NavLinkStyled to="/dashboard">
            <AccountContainer>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="30px"
                viewBox="0 -960 960 960"
                width="30px"
                fill="#999"
              >
                <path d="M222-255q63-44 125-67.5T480-346q71 0 133.5 23.5T739-255q44-54 62.5-109T820-480q0-145-97.5-242.5T480-820q-145 0-242.5 97.5T140-480q0 61 19 116t63 109Zm257.81-195q-57.81 0-97.31-39.69-39.5-39.68-39.5-97.5 0-57.81 39.69-97.31 39.68-39.5 97.5-39.5 57.81 0 97.31 39.69 39.5 39.68 39.5 97.5 0 57.81-39.69 97.31-39.68 39.5-97.5 39.5Z" />
              </svg>
              <AccountName>{username || "Account"}</AccountName>
            </AccountContainer>
          </NavLinkStyled>
        </NavItem>
      </NavList>
    </Navbar>
  );
}

export default DesktopNavbar;