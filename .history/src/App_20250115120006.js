import logo from './logo.svg';
import React, { useEffect, useState } from 'react';
import {BrowserRouter as Router,Route,Routes,Link} from "react-router-dom"
import './App.css';
import "bootstrap/dist/css/bootstrap.css";
import Products from './components/products';
import Navbar from './components/Navbar/navBar';
import Cart2 from './components/Cart2';
import Home from './components/Home';
import NewProduct from './components/newProduct';
import Account from './components/newAccount';
import SelectedProduct from './components/selectedProduct';
import Category from './components/category';
import Payment from './components/Payment/Payment';
import Alert from './components/alert';
import ShowAlert from './components/globalAlert';
import CartCount from './components/cartCount';
import ProductSearch from './components/search';
import ProductPreview from './components/productPreview';


function App() {
  
  
  const [data, setData] = useState("");
  const [products, setProducts] = useState([])
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAlert, setShowAlert] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProduct, setSelectedProduct] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [handleProductClick, setHandleProductClick]= useState()
  
 
  

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


  const handleAlert = () => {
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000); // Hide after 3 seconds
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
    <Navbar cart={cart} searchTerm={searchTerm} setSearchTerm={setSearchTerm} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory}/>
  <Payment/>
    <Routes>
      <Route path="/" element={<Home filteredProducts={filteredProducts}  setSelectedProduct={selectedProduct} addToCart={addToCart} handleShowAlert={handleAlert} showAlert={showAlert} searchTerm={searchTerm} setSearchTerm={setSearchTerm} handleProductClick={handleProductClick} ha
      />}></Route>
      <Route path="/Products" element={<Products filteredProducts={filteredProducts} setSelectedProduct={setSelectedProduct} addToCart={addToCart} cart={cart} handleShowAlert={handleAlert} showAlert={showAlert} searchTerm={searchTerm} highlightText={highlightText} handleProductClick={setHandleProductClick}/>}></Route>
      <Route path="/newproduct" element={<NewProduct/>}></Route>
      <Route path="/newAccount" element={<Account/>}></Route>
      <Route path="/Cart2" element={<Cart2 searchTerm={searchTerm} highlightText={highlightText}/>}></Route>
      <Route path="/selectedProduct" element={<SelectedProduct selectedProduct={selectedProduct}  addToCart={addToCart} searchTerm={searchTerm}/>}></Route>
      <Route path="/category" element={<Category items={products} selectedCategory={selectedCategory} highlightText={highlightText} addToCart={addToCart} searchTerm={searchTerm} setSearchTerm={setSearchTerm} handleProductClick={handleProductClick}
ul />}></Route>
    </Routes>
  </Router>

 
  </>
   
  );
}

export default App;
