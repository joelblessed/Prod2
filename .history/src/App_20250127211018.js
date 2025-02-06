import logo from "./logo.svg";
import React, { createContext, use, useEffect, useState } from "react";
import ProtectedRoute from "./components/Navbar/Account/ProtectedRoute";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  Link,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import "react-toastify/dist/ReactToastify.css";
import Products from "./components/pages/products";
import Cart2 from "./components/Cart/Cart2";
import Home from "./components/pages/Home";
import NewProduct from "./components/pages/newProduct";
import Account from "./components/account/signUP";
import SelectedProduct from "./components/pages/selectedProduct";
import Category from "./components/pages/category";
import Payment from "./components/Payment/Payment";
import AnimatedBox from "./components/others/AnimatedEdges";
import Alert from "./components/others/alert";
import ShowAlert from "./components/others/globalAlert";
import CartCount from "./components/others/cartCount";
import ProductSearch from "./components/others/search";
import ProductPreview from "./components/others/productPreview";
import DesktopNavbar from "./components/Navbar/DesktopNavbar";
import MobileNavbar from "./components/Navbar/MobileNavbar";
import SignIN from "./components/account/signIN";
import SignUP from "./components/account/signUP";
import Dashboard from "./components/account/dashboard";
import Customer from "./components/others/customer";
import Test from "./components/Payment/test";
import ShoppingCart from "./components/Cart/incrementCart";
import DeleteCart from "./components/Cart/deleteCart";
import Checkout from "./components/Cart/checkout";

function App() {
  const [calalculateTotal, setCalculateTotal] = useState()
  const [checkout, setCheckOut] = useState()
  const [item, setItem] = useState([]);
  const [increment, setIncrement] = useState();
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAlert, setShowAlert] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProduct, setSelectedProduct] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isMobile, setIsMobile] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState();
  const [displayusername, displayusernameupdate] = useState("");
  const AuthContext = createContext();

  // Function to check screen size
  const handleResize = () => {
    setIsMobile(window.innerWidth <= 760);
  };


  useEffect(() => {
    handleResize(); // Initial check
    window.addEventListener("resize", handleResize); // Update on resize
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    let username = sessionStorage.getItem("username");
    if (username === "" || username === null) {
    } else {
      displayusernameupdate(username);
    }
  });

  const handleSignIn = () => {
    let username = sessionStorage.getItem("username");
    if (username === "" || username === null) {
    } else {
      setIsAuthenticated(true);
    }
  };

  const handlesignout = () => {
    localStorage.removeItem("authToken");
    setIsAuthenticated(false);
  };

  const addToCart = async (item) => {
    setCart((prevCart) => [...prevCart, item]);

    await fetch("http://localhost:4000/cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    });
  };

  useEffect(() => {
    // Fetch images from the local API
    fetch("http://localhost:5000/products?_sort=_id&_order=desc") // Adjust the URL if necessary
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching images:", error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    // Fetch images from the local API
    fetch("http://localhost:4000/cart?_sort=_id&_order=desc") // Adjust the URL if necessary
      .then((response) => response.json())
      .then((data) => {
        setCart(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching images:", error);
        setLoading(false);
      });
  }, []);

  const filteredProducts = products.filter(
    (product) =>
      product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const highlightText = (text, term) => {
    const regex = new RegExp(`(${term})`, "gi");
    return text.replace(regex, "<strong>$1</strong>");
  };

  if (loading) {
    return <p>loading...</p>;
  }

  return (
    <>
      <ToastContainer theme="colored" position="top-center"></ToastContainer>

      <Router>
        {isMobile ? (
          <MobileNavbar
            cart={cart}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            displayusername={displayusername}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
        ) : (
          <DesktopNavbar
            cart={cart}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            displayusername={displayusername}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
        )}

        <Routes>
          <Route
            path="/"
            element={
              <Home
                filteredProducts={filteredProducts}
                setSelectedProduct={setSelectedProduct}
                addToCart={addToCart}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                highlightText={highlightText}
              />
            }
          ></Route>
          <Route
            path="/Products"
            element={
              <Products
                filteredProducts={filteredProducts}
                setSelectedProduct={setSelectedProduct}
                addToCart={addToCart}
                cart={cart}
                searchTerm={searchTerm}
                highlightText={highlightText}
              />
            }
          ></Route>

          <Route
            path="/Cart2"
            element={
              <Cart2 searchTerm={searchTerm} highlightText={highlightText} />
            }
          ></Route>
          <Route
            path="/selectedProduct"
            element={
              <SelectedProduct
                selectedProduct={selectedProduct}
                addToCart={addToCart}
                searchTerm={searchTerm}
              />
            }
          ></Route>
          <Route
            path="/category"
            element={
              <Category
                items={products}
                selectedCategory={selectedCategory}
                highlightText={highlightText}
                addToCart={addToCart}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                setSelectedProduct={setSelectedProduct}
              />
            }
          ></Route>
          <Route path="/customer" element={<Customer />}></Route>
          <Route path="/signIN" element={<SignIN onSignIn={handleSignIn} />} />
          <Route path="/signUP" element={<SignUP />} />
          <Route path="/checkout" element={<Checkout  setCalculateTotal={setCalculateTotal} setCheckOut={setCheckOut} paymentStatus={paymentStatus}/>} />
          <Route path="/Payment" element={<Payment amount={calalculateTotal} checkout={checkout} setPaymentStatus={setPaymentStatus}/>} />

          <Route
            path="/newProduct"
            element={
              isAuthenticated ? <NewProduct /> : <Navigate to="/signIN" />
            }
          />

          <Route
            path="dashboard"
            element={
              isAuthenticated ? (
                <Dashboard signout={handlesignout} />
              ) : (
                <Navigate to="/signUP" />
              )
            }
          />

          <Route
            path="checkout"
            element={isAuthenticated ? <Checkout /> : <Navigate to="/SignIn" />}
          />

          {/* Redirect unknown routes */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        {/* <Test/> */}
      </Router>
    </>
  );
}

export default App;
