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
    }, [products]);
 
  return (
    <>
  
      <div   
        
        style={ styles.container }
      >
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product, index) => (
            <div >
             uhosuhoih{selectedCategory}
            <div className="animated-box"
              key={index}
              
              style={{
                ...styles.box,
               
                justifyContent:index === filteredProducts.length -1 ? "space-evenly" : {} // Apply style only to the last box
              }}
            >
              {product.images.length > 0 ? (
                <img
                  src={product.images[0]} // Display first image only
                  alt={product.name}
                  style={{
                    width: "300px",
                    height: "300px",
                    objectFit: "cover",
                    borderRadius: "10px",
                  }}
                  onClick={() => handleProductClick(product)}

                  // onClick={() =>
                  //   toggleSelection(
                  //     product.id,
                  //     product.isSelected,
                  //     navigate("/selectedProduct")
                  //   )
                  // }
                />
                
              ) : (
                <p>No image available</p>
              )}
              <span
                className="text"
                style={{
                  background:
                    " linear-gradient(45deg,white 33%, white 33%, #86a8e7 66%, #91eae4 66%)",
                    borderRadius:"10PX",
                  
                }}
              >
                <h5 className="name">
                  <span
                    style={{ color: "black" }}
                    dangerouslySetInnerHTML={{
                      __html: highlightText(product.name, searchTerm),
                    }}
                  ></span>{" "}
                </h5>
                <h5>Description: {product.desc}  
                </h5>
                <h5>
                  Price: {product.price}{" "}
                  <button  style={{
                      background: "transparent",
                      border: "1px solid orange",
                      color: "orange",
                      padding: "0px 20px",
                      borderRadius: "10px 10px 10px 10px ",
                      cursor: "pointer",
                      fontSize: "40px",
                      fontWeight:"bold",
                      transition: "all 0.3s ease",
                      marginLeft:"140px"
                      
                    }} onClick={() => addTowishList(product)}>+</button>
                </h5>
                <div style={{ background: "" }}>
                  <button
                    style={{
                      background: "white",
                      border: "1px solid RED",
                      color: "red",
                      padding: "10px 20px",
                      borderRadius: "0px 0px 10px 10px ",
                      cursor: "pointer",
                      fontSize: "100%",
                      transition: "all 0.3s ease",
                      width: "100%",
                    }}
                    onClick={() => addToCart(product)}
                    
                  >
                    addToCart
                  </button>
              
                </div>
              </span>
            </div>
            </div>
          ))
        ) : (
          <p>Loading...</p>
        )}
      </div>

    
      {/* {product.isSelected ? "Unselect" : "Select"} */}
    </>
    
  );
};

export default Products;
