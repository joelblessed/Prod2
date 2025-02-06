import logo from "./logo.svg";
import React, { createContext, use, useEffect, useState } from "react";
import { AuthContext, AuthProvider } from "./AuthContext";
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
import Alert from "./components/others/alert";
import ShowAlert from "./components/others/globalAlert";
import CartCount from "./components/others/cartCount";
import ProductSearch from "./components/others/search";
import ProductPreview from "./components/others/productPreview";
import DesktopNavbar from "./components/Navbar/DesktopNavbar";
import MobileNavbar from "./components/Navbar/MobileNavbar";
import SignIN from "./signIN";
import SignUP from "./components/account/signUP";
import Dashboard from "./components/account/dashboard";
import Customer from "./components/others/customer";
import Test from "./components/pages/test";
import ShoppingCart from "./components/Cart/incrementCart";
import DeleteCart from "./components/Cart/deleteCart";
import Checkout from "./components/Cart/checkout";
import ProtectedRoute from "./ProtectedRoute";
import ForgotPassword from "./components/account/forgotPasword";
import ResetPassword from "./components/account/resetPassword";


function App() {
  const [calalculateTotal, setCalculateTotal] = useState();
  const [checkout, setCheckOut] = useState();
  const [sendCart, setSendCart] = useState([]);
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
  const [paymentStatus, setPaymentStatus] = useState("");
  const [phoneNumber, setPhoneNumber] = useState();
  const [paymentId, setPaymentId] = useState("");
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

    await fetch("http://localhost:5000/cart", {
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
    fetch("http://localhost:5000/cart?_sort=_id&_order=desc") // Adjust the URL if necessary
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
    <AuthProvider>
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
        <R/>
        
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
          <Route path="/forgotPassword" element={<ForgotPassword />} />
          <Route path="/resetPassword" element={<ResetPassword />} />
          <Route
            path="/checkout"
            element={
              <Checkout
                setCalculateTotal={setCalculateTotal}
                setCheckOut={setCheckOut}
                paymentStatus={paymentStatus}
                paymentNumber={phoneNumber}
                paymentId={paymentId}
              />
            }
          />
          <Route
            path="/Payment"
            element={
              <Payment
                amount={calalculateTotal}
                checkout={checkout}
                setPaymentStatus={setPaymentStatus}
                setPhoneNumber={setPhoneNumber}
                setPaymentId={setPaymentId}
              />
            }
          />

          <Route
            path="/newProduct"
            element={
            <ProtectedRoute allowedRoles={['admin','user']}><NewProduct/></ProtectedRoute> 
            }
          />

          <Route
            path="dashboard"
            element={
             
              <ProtectedRoute allowedRoles={['admin','user']}><Dashboard/></ProtectedRoute>
            }
          />

          <Route
            path="checkout"
            element={<ProtectedRoute allowedRoles={['admin','user']}><Checkout/></ProtectedRoute>}
          />

          {/* Redirect unknown routes */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        {/* <Test/> */}
      </Router>
    </AuthProvider>
  );
}

export default App;
