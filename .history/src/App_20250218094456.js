import logo from "./logo.svg";
import React, { createContext, use, useEffect, useState } from "react";
import { AuthContext, AuthProvider } from "./AuthContext";
import { useLocation } from "react-router-dom"; 
import useRefreshOnSearch from "./useRefreshOnSearch";
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
import Brand from "./components/pages/brand";
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
  const [cart, setCart] = useState([]);
  const [wishlist, setWishList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAlert, setShowAlert] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState();
  const [displayusername, displayusernameupdate] = useState();
  const [paymentStatus, setPaymentStatus] = useState("");
  const [phoneNumber, setPhoneNumber] = useState();
  const [paymentId, setPaymentId] = useState("");
  const [product, setProduct] = useState([]);
  const [products, setProducts] = useState([]); // full list of products
  const [filteredProducts, setFilteredProducts] = useState([]); // filtered list
  const [searchTerm, setSearchTerm] = useState(""); // single input for filtering
  const [categories, setCategories] = useState([]); // Unique categories
  const [inwishlist, setInWishList] = useState([null]);
  const [searchFunction, setSearchFunction] = useState(null)
  const location = useLocation(); 
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




  // ✅ Fetch products when component mounts
  useEffect(() => {
    fetch("http://localhost:3000/products")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        setFilteredProducts(data);

        const uniqueCategories = [...new Set(data.map((product) => product.category))];
        setCategories(uniqueCategories);
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  // ✅ Reset filters when the page changes
  useEffect(() => {
    setFilteredProducts(products); // Reset to all products on page change
    setSearchQuery(""); // Clear search input
  }, [location.pathname, products]); // Runs when page changes

  // ✅ Handle search filtering (Only affects the current page)
  useEffect(() => {
    let filtered = products.filter((product) => {
      const query = searchQuery.trim().toLowerCase();

      const categoryMatch = product.category.toLowerCase().includes(query);
      const productNameMatch = product.name.toLowerCase().includes(query);
      const brandMatch = Array.isArray(product.brand)
        ? product.brand.some((b) => b.name.toLowerCase().includes(query))
        : product.brand?.toLowerCase().includes(query);

      return categoryMatch || productNameMatch || brandMatch;
    });

    // ✅ Apply category filter
    if (selectedCategory) {
      filtered = filtered.filter((product) => product.category === selectedCategory);
    }

    setFilteredProducts(filtered);
  }, [searchQuery, selectedCategory, products]);
  // // Fetch products from db.json when the component mounts
  // useEffect(() => {
  //   fetch(`${api}/products`)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       const productsData = data.products || data;
  //       setProducts(productsData);
  //       setFilteredProducts(productsData);

  //       // Extract unique categories from the products
  //       const uniqueCategories = [
  //         ...new Set(productsData.map((product) => product.category)),
  //       ];
  //       setCategories(uniqueCategories);
  //     })
  //     .catch((error) => console.error("Error fetching products:", error));
  // }, []);

  // // Handle filtering logic
  // const handleSearch = () => {
  //   const query = searchTerm.trim().toLowerCase();

  //   let filtered = products.filter((product) => {
  //     const categoryMatch = product.category.toLowerCase().includes(query);
  //     const productNameMatch = product.name.toLowerCase().includes(query);
  //     const brandMatch = product.brand.some((b) =>
  //       b.name.toLowerCase().includes(query)
     
  //     );

  //     return categoryMatch || productNameMatch || brandMatch;
  //   });

  //   // Apply category filter if a category is selected
  //   if (selectedCategory) {
  //     filtered = filtered.filter(
  //       (product) => product.category === selectedCategory
  //     );
  //   }

  //   setFilteredProducts(filtered);
  //   setSearchTerm(""); // Clear input after search
  //   sessionStorage.setItem("searchTriggered:true");
  // };

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

  const highlightText = (text, term) => {
    const regex = new RegExp(`(${term})`, "gi");
    return text.replace(regex, "<strong>$1</strong>");
  };

  if (loading) {
    return <p>loading...</p>;
  }
const sendSearchFunction =(fn) =>{
  setSearchFunction(()=>fn);
}
  return (
    <AuthProvider>
      <ToastContainer theme="colored" position="top-center"></ToastContainer>

      <Router>
        {isMobile ? (
          <MobileNavbar
            api={api}
            cart={cart}
            search={handleSearch}
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
            search={handleSearch}
            searchFunction={searchFunction}
            
            categories={categories}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            displayusername={displayusername}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
        )}

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
                getProducts={products}
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
                selectedCategory={selectedCategory}
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
                getProducts={products}
                categories={categories}
                setCategories={setCategories}
            sendSearchFunction={sendSearchFunction}
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

          <Route
            path="/brand"
            element={
              <Brand
                api={api}
                filteredProducts={filteredProducts}
                searchTerm={searchTerm}
              />
            }
          />
          <Route
            path="/brand/:brandId"
            element={
              <BrandPage
                api={api}
                filteredProducts={filteredProducts}
                searchTerm={searchTerm}
              />
            }
          />

          <Route
            path="/forgotPassword"
            element={<ForgotPassword api={api} />}
          />
          <Route path="/resetPassword" element={<ResetPassword api={api} />} />

          <Route
            path="/category/:categoryName"
            element={
              <CategoryPage
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
