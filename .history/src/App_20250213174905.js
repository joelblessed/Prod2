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
import NewProduct from "./components/pages/formUpload";
import Account from "./components/account/signUP";
import SelectedProduct from "./components/pages/selectedProduct";
import Category from "./components/pages/category";
import CategoryPage from "./components/pages/categoryPage";
import Brands from "./components/pages/brand";
import BrandPage from "./components/pages/brandPage";
import Payment from "./components/Payment/Payment";
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
import Test from "./components/pages/test";
import ShoppingCart from "./components/others/incrementCart";
import DeleteCart from "./components/others/deleteCart";
import Checkout from "./components/Cart/checkout";
import ProtectedRoute from "./ProtectedRoute";
import ForgotPassword from "./components/account/forgotPasword";
import ResetPassword from "./components/account/resetPassword";
import FormUpload from "./components/pages/formUpload";
import ProductSelection from "./components/pages/productSelection";
import Footer from "./components/pages/footer";

function App() {
  const [calalculateTotal, setCalculateTotal] = useState();
  const [checkout, setCheckOut] = useState();
  const [sendCart, setSendCart] = useState([]);
  const [increment, setIncrement] = useState();
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [wishlist, setWishList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAlert, setShowAlert] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProduct, setSelectedProduct] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isMobile, setIsMobile] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState();
  const [displayusername, displayusernameupdate] = useState();
  const [paymentStatus, setPaymentStatus] = useState("");
  const [phoneNumber, setPhoneNumber] = useState();
  const [paymentId, setPaymentId] = useState("");
  const [product, setProduct] = useState([]);
  const [inwishlist, setInWishList] = useState([null]);
  const [api, setApi] = useState("http://localhost:5000");

  // https://prod2-api.onrender.com
  // http://localhost:5000

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
      displayusernameupdate(username);
    } else {
    }
  });

  const addToCart = async (item) => {
    setCart((prevCart) => [...prevCart, item]);
    let cart = JSON.parse(localStorage.getItem("guestCart")) || [];
    cart.push(item);
    localStorage.setItem("guestCart", JSON.stringify(cart));
    // await fetch(`${api}/addToCart`, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(item),
    // });
  };

  const addToWishList = async (item) => {
    setWishList((prevCart) => [...prevCart, item]);

    await fetch(`${api}/addTowishlist`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    });
  };

  useEffect(() => {
    // Fetch images from the local API
    fetch(`${api}/products?_sort=_id&_order=desc`) // Adjust the URL if necessary
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

  // useEffect(() => {
  //   // Fetch images from the local API
  //   fetch(`${api}/wishlist?_sort=_id&_order=desc`) // Adjust the URL if necessary
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setProducts(data);
  //       setLoading(false);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching images:", error);
  //       setLoading(false);
  //     });
  // }, []);

  // const productId = 355;
  //   useEffect(() => {
  //     fetch(`${api}/wishlist/${productId}`)
  //       .then(res => {
  //         if (res.ok) return res.json();
  //         throw new Error("Product not found");
  //       })
  //       .then(() => setInWishList(true))
  //       .catch(() => setInWishList(false));
  //   }, [productId]);

  useEffect(() => {
    // Fetch images from the local API
    fetch(`${api}/cart?_sort=_id&_order=desc`) // Adjust the URL if necessary
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
            api={api}
            cart={cart}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            displayusername={displayusername}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
        ) : (
          <DesktopNavbar
            api={api}
            cart={cart}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            displayusername={displayusername}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
        )}
        {inwishlist}
        {/* <Test api={api}  filteredProducts={filteredProducts}/> */}
        <Routes>
          <Route
            path="/"
            element={
              <Home
                api={api}
                filteredProducts={filteredProducts}
                setSelectedProduct={setSelectedProduct}
                addToCart={addToCart}
                addToWishList={addToWishList}
                inwishlist={inwishlist}
                searchTerm={searchTerm}
                product={setProduct}
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
                addToWishList={addToWishList}
                inwishlist={inwishlist}
                cart={cart}
                api={api}
                searchTerm={searchTerm}
                highlightText={highlightText}
              />
            }
          ></Route>

          <Route
            path="/selectedProduct"
            element={
              <SelectedProduct
                api={api}
                selectedProduct={selectedProduct}
                addToCart={addToCart}
                addToWishList={addToWishList}
                inwishlist={inwishlist}
                searchTerm={searchTerm}
              />
            }
          ></Route>
          <Route
            path="/category"
            element={
              <Category
                api={api}
                items={products}
                filteredProducts={filteredProducts}
                selectedCategory={selectedCategory}
                highlightText={highlightText}
                addToCart={addToCart}
                addToWishList={addToWishList}
                inwishlist={inwishlist}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                setSelectedProduct={setSelectedProduct}
              />
            }
          ></Route>
          <Route path="/customer" element={<Customer api={api} />}></Route>
          <Route path="/signIN" element={<SignIN api={api} />} />
          <Route path="/signUP" element={<SignUP api={api} />} />
          <Route
            path="/productSelection"
            element={<ProductSelection api={api} />}
          />
                searchTerm={searchTerm}
          <Route path="/brand" element={<Brands api={api}    filteredProducts={filteredProducts} searchTerm={searchTerm}  />} />
          <Route path="/brand/:id" element={<BrandPage api={api} />} />


          <Route
            path="/forgotPassword"
            element={<ForgotPassword api={api} />}
          />
          <Route path="/resetPassword" element={<ResetPassword api={api} />} />
          

          <Route
            path="/category/:categoryName"
            element={
              <CategoryPage api={api} filteredProducts={filteredProducts} />
            }
          />
          <Route
            path="/checkout"
            element={
              <Checkout
                api={api}
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
                api={api}
                amount={calalculateTotal}
                checkout={checkout}
                setPaymentStatus={setPaymentStatus}
                setPhoneNumber={setPhoneNumber}
                setPaymentId={setPaymentId}
              />
            }
          />

          <Route
            path="/Cart2"
            element={
              <Cart2
                api={api}
                searchTerm={searchTerm}
                highlightText={highlightText}
                inwishlist={inwishlist}
              />
            }
          ></Route>

          <Route
            path="/formUpload"
            element={
              <ProtectedRoute allowedRoles={["admin", "user"]}>
                <FormUpload api={api} />
              </ProtectedRoute>
            }
          />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute allowedRoles={["admin", "user"]}>
                <Dashboard api={api} />
              </ProtectedRoute>
            }
          />

          <Route
            path="/checkout"
            element={
              <ProtectedRoute allowedRoles={["admin", "user"]}>
                <Checkout api={api} />
              </ProtectedRoute>
            }
          />

          {/* Redirect unknown routes */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        {/* <Test/> */}
        <Footer />
      </Router>
    </AuthProvider>
  );
}

export default App;
