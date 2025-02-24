import React, { useEffect, useState } from "react";
import "./products.css";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../AuthContext";
import { useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, removeFromCart } from "../../cartSlice";

const Products = ({
  api,
  loading,
  images,
  filteredProducts,
  setSelectedProduct,
  addToCart,
  addTowishList,
  handleShowAlert,
  showAlert,
  searchTerm,
  highlightText,
  selectedCategory,
  Fortop,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [products, setProducts] = useState([]);
  const [isMobile, setIsMobile] = useState(false);


  // Function to check screen size
  const handleResize = () => {
    setIsMobile(window.innerWidth <= 760);
  };

  useEffect(() => {
    handleResize(); // Initial check
    window.addEventListener("resize", handleResize); // Update on resize
    return () => window.removeEventListener("resize", handleResize);
  }, []);


  const navigate = useNavigate();
  const handleProductClick = (product) => {
    setSelectedProduct(product);
    localStorage.setItem("selectedProduct",product);
    navigate("/selectedProduct");
  };
  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  // Toggle the selection state of a product
  const toggleSelection = (id, currentSelection) => {
    // Update the product on the server using PATCH
    fetch(`${api}/updateProducts/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ isSelected: !currentSelection }),
    })
      .then((response) => response.json())
      .then((updatedProduct) => {
        // Update the local state to reflect the change
        setProducts((prevProducts) =>
          prevProducts.map((product) =>
            product.id === id ? updatedProduct : product
          )
        );
      })
      .catch((error) => console.error("Error updating product:", error));
  };
 
  const styles = {
    container: {
      display: "flex",
      flexDirection:"row",
      flexWrap: "wrap",
      justifyContent:"center",
      alignItems: "center",
      gap: "20px",
      background :"red",
      maxWidth: "90%", // Prevents full width spread
      margin: "auto", // Centers the whole container
      padding: "20px",
    },
    box: {
     
      background:"green",
     marginTop:"90px"
    },
    
    lastBox: {
     
      background:"blue"
       // Pushes last box to the left
    },
  };
 
  return (
    <div className="product-container">
      <button className="toggle-btn" onClick={() => setVisible(!visible)}>
        {visible ? "Hide Products" : "Show Products"}
      </button>

      {visible && (
        <div className="product-grid">
          {products.map(product => (
            <div key={product.id} className="product-card">
              <img src={product.image} alt={product.name} className="product-image" />
              <h3>{product.name}</h3>
              <p className="brand">{product.brand}</p>
              <p className="price">${product.price.toFixed(2)}</p>
              <p className="rating">⭐ {product.rating}</p>
              <button className="add-to-cart">Add to Cart</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};



export default Products;
