import logo from './logo.svg';
import React, { createContext, useEffect, useState } from 'react';
import {BrowserRouter as Router,Route,Routes,Navigate ,Link} from "react-router-dom"
import './App.css';
import "bootstrap/dist/css/bootstrap.css";
import "react-toastify/dist/ReactToastify.css";
import {toast} from "react-toastify";
import Products from './components/products';
import Navbar from './components/Navbar/navBar';
import Cart2 from './components/Cart2';
import Home from './components/Home';
import NewProduct from './components/newProduct';
import Account from './components/signUP';
import SelectedProduct from './components/selectedProduct';
import Category from './components/category';
import Payment from './components/Payment/Payment';
import AnimatedBox from './components/AnimatedEdges';
import Alert from './components/alert';
import ShowAlert from './components/globalAlert';
import CartCount from './components/cartCount';
import ProductSearch from './components/search';
import ProductPreview from './components/productPreview';
import DesktopNavbar from './components/Navbar/DesktopNavbar';
import MobileNavbar from "./components/Navbar/MobileNavbar";
import SignIN from './components/signIN';
import SignUP from './components/signUP';
import LogIN from './components/logIN';
import Dashboard from './components/dashboard';
import Test from './components/Payment/test';



function App() {
  
  
  const [data, setData] = useState("");
  const [products, setProducts] = useState([])
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAlert, setShowAlert] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProduct, setSelectedProduct] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [isMobile, setIsMobile] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
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


  const handleSignIn = (token) => {
    localStorage.setItem("authToken", token)
    setIsAuthenticated(true); // Update auth state after login
  };
  const handlesignout =()=>{
    localStorage.removeItem("authToken")
    setIsAuthenticated(false);
  }

  

  const addToCart = async (item) => {
    setCart((prevCart) => [...prevCart, item,]);

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
    fetch('http://localhost:5000/products?_sort=_id&_order=desc') // Adjust the URL if necessary
        .then(response => response.json())
        .then(data => {
            setProducts(data);
            setLoading(false);
        })
        .catch(error => {
            console.error('Error fetching images:', error);
            setLoading(false);
        });
}, []);



  useEffect(() => {
      // Fetch images from the local API
      fetch('http://localhost:4000/cart?_sort=_id&_order=desc') // Adjust the URL if necessary
          .then(response => response.json())
          .then(data => {
              setCart(data);
              setLoading(false);
          })
          .catch(error => {
              console.error('Error fetching images:', error);
              setLoading(false);
          });
  }, []);

  const filteredProducts = products.filter((product) => ( 
    product.category.toLowerCase().includes(searchTerm.toLowerCase())||
    product.name .toLowerCase().includes(searchTerm.toLowerCase())
  ));



  const highlightText = (text, term) => {
    const regex = new RegExp(`(${term})`, "gi");
    return text.replace(regex, "<strong>$1</strong>");
  };

 if (loading){
    return <p>loading...</p>

  };
  
 
  
  return (<>
  <Router>
  {isMobile ?
   <MobileNavbar cart={cart} searchTerm={searchTerm} setSearchTerm={setSearchTerm} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory}/> 
  : 
  <DesktopNavbar cart={cart} searchTerm={searchTerm} setSearchTerm={setSearchTerm} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory}/>}
  
  
  {/* <Payment/> */}
  
    <Routes>
    
      <Route path="/" element={<Home filteredProducts={filteredProducts}  setSelectedProduct={setSelectedProduct} addToCart={addToCart}  searchTerm={searchTerm} setSearchTerm={setSearchTerm} highlightText={highlightText}
      />}></Route>
      <Route path="/Products" element={<Products filteredProducts={filteredProducts} setSelectedProduct={setSelectedProduct} addToCart={addToCart} cart={cart} searchTerm={searchTerm} highlightText={highlightText}/>}></Route>
     
     
      <Route path="/Cart2" element={<Cart2 searchTerm={searchTerm} highlightText={highlightText}/>}></Route>
      <Route path="/selectedProduct" element={<SelectedProduct selectedProduct={selectedProduct}  addToCart={addToCart} searchTerm={searchTerm}/>}></Route>
      <Route path="/category" element={<Category items={products} selectedCategory={selectedCategory} highlightText={highlightText} addToCart={addToCart} searchTerm={searchTerm} setSearchTerm={setSearchTerm}  setSelectedProduct={setSelectedProduct}/>}></Route>
      <Route path="/signIN" element={<SignIN onSignIn={handleSignIn} />} />
      <Route path="/signUP" element={<SignUP onSignIn={handleSignIn} />} />
      <Route path="/LogIN" element={<LogIN />} />
      

      
   <Route
          path="/newProduct"
          element={
            isAuthenticated ? <NewProduct/> : <Navigate to="/logIN" />
          }
        />

    <Route
              path="dashboard"
              element={
                isAuthenticated ? <Dashboard signout={handlesignout}/> : <Navigate to="/logIN" />
              }
            />
        {/* Redirect unknown routes */}
        <Route path="*" element={<Navigate to="logIN" />} />
        
    
 
    </Routes>
    <Test/>
  </Router>

 
  </>
   
  );
}

export default App;
