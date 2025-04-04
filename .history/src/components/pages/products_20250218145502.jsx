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
  likedProducts,
  toggleLike,
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
  const [visibleItems, setVisibleItems] = useState([]);


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

    // Intersection Observer for fade-in effect
    useEffect(() => {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleItems((prev) => [...prev, entry.target]);
          }
        });
      }, { threshold: 0.3 });
  
      const boxes = document.querySelectorAll(".fade-box");
      boxes.forEach((box) => observer.observe(box));
  
      return () => {
        boxes.forEach((box) => observer.unobserve(box));
      };
    }, [filteredProducts]);
 
  return (
    <>
      <div className="products-container">
      {filteredProducts.map((product) => (
        <div
          key={product.id}
          className={`fade-box ${visibleItems.includes(product.id) ? "visible" : ""}`}
          style={{
            opacity: visibleItems.includes(product.id) ? 1 : 0,
            transform: visibleItems.includes(product.id) ? "translateY(0)" : "translateY(50px)",
          }}
        >
          <div className="product-card">
            <img src={product.images[0]} alt={product.name} className="product-image" />
            <div className="product-info">
              <h3>{product.name}</h3>
              <p>{product.desc}</p>
              <h4>{product.price}</h4>

              {/* Like Button */}
              <button
                className={`like-btn ${likedProducts.includes(product.id) ? "liked" : ""}`}
                onClick={() => toggleLike(product)}
              >
                {likedProducts.includes(product.id) ? "Unlike" : "Like"}
              </button>

              {/* Add to Wishlist */}
              <button className="wishlist-btn" onClick={() =>  addTowishList(product)}>
                Add to Wishlist
              </button>

              {/* Add to Cart */}
              <button className="cart-btn" onClick={() => addToCart(product)}>
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
    </>
    
  );
};

export default Products;
