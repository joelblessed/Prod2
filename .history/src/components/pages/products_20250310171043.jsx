import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../AuthContext";
import { useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addToCartBeforeLogin, addToCartAPI } from "../../cartAction";
import { addToWishListAPI } from "../../wishlistAction";
import { addToCart, removeFromCart } from "../../cartSlice";

const Products = ({
  api,
  loading,
  add,
  images,
  filteredProducts,
  setSelectedProduct,
  addToCart,
  addToWishList,
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
  const dispatch = useDispatch();

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
    localStorage.setItem("selectedProduct", product);
    navigate("/selectedProduct");
  };
  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  // Toggle the selection state of a product
  const toggleSelection = (id, currentSelection) => {
    // Update the product on the server using PATCH
    fetch(${api}/updateProducts/${id}, {
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
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "center",
      alignItems: "center",
      gap: "20px",
      background: "white",
      maxWidth: "96%", // Prevents full width spread
      margin: "auto", // Centers the whole container
      padding: "20px",
      marginTop: "50px",
    },
    productCard: {
      border: "1px solid red",
      borderRadius: "12px",
      overflow: "hidden",
      width: "250px",
      background: "white",
    },
    imageContainer: {
      width: "250px",
      height: "250px",
      overflow: "hidden",
      borderRadius: "10px",
    },
    image: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      cursor: "pointer",
    },
    textContainer: {
      display: "flex",
      justifyContent: "space-between",
      padding: "10px",
      background:
        "linear-gradient(45deg, white 33%, white 33%, #86a8e7 66%, #91eae4 66%)",
      borderRadius: "10px",
      width: "215px",
      height: "100px",
    },
    productName: {
      color: "black",
      fontSize: "16px",
      fontWeight: "bold",
    },
    productDescription: {
      fontSize: "14px",
      color: "#333",
    },
    productPrice: {
      fontSize: "14px",
      color: "#333",
    },
    actionButtons: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "10px",
      background: "white",
      height: "100px",
    },
    likeButton: {
      background: "none",
      border: "none",
      cursor: "pointer",
    },
    addToCartButton: {
      background: "transparent",
      border: "none",
      color: "orange",
      fontSize: "24px",
      cursor: "pointer",
      transition: "all 0.3s ease",
    },
    addToCartMainButton: {
      background: "white",
      border: "1px solid red",
      color: "red",
      padding: "10px 20px",
      borderRadius: "0px 0px 10px 10px",
      cursor: "pointer",
      fontSize: "16px",
      transition: "all 0.3s ease",
      width: "100%",
    },
  };

  return (
    <div style={styles.container}>
      {filteredProducts.length > 0 ? (
        filteredProducts.map((product, index) => (
          <div key={index} style={styles.productCard}>
            <div style={styles.imageContainer}>
              {product.images.length > 0 ? (
                <img
                  src={product.images[0]} // Display first image only
                  alt={product.name}
                  style={styles.image}
                  onClick={() => handleProductClick(product)}
                />
              ) : (
                <p>No image available</p>
              )}
            </div>

            {/* Text and Action Buttons */}
            <div style={{ display: "flex" }}>
              <div style={styles.textContainer}>
                <div>
                  <h5 style={styles.productName}>
                    <span
                      dangerouslySetInnerHTML={{
                        __html: highlightText(product.name, searchTerm),
                      }}
                    ></span>
                  </h5>
                  <h6 style={styles.productDescription}>
                    Description: {product.description}
                  </h6>
                  <h6 style={styles.productPrice}>Price: {product.price}</h6>
                </div>
              </div>

              {/* Like and Add to Cart Buttons */}
              <div style={styles.actionButtons}>
                <button style={styles.likeButton}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24px"
                    viewBox="0 -960 960 960"
                    width="24px"
                    fill="red"
                  >
                    <path d="m480-120-58-52q-101-91-167-157T150-447.5Q111-500 95.5-544T80-634q0-94 63-157t157-63q52 0 99 22t81 62q34-40 81-62t99-22q94 0 157 63t63 157q0 46-15.5 90T810-447.5Q771-395 705-329T538-172l-58 52Zm0-108q96-86 158-147.5t98-107q36-45.5 50-81t14-70.5q0-60-40-100t-100-40q-47 0-87 26.5T518-680h-76q-15-41-55-67.5T300-774q-60 0-100 40t-40 100q0 35 14 70.5t50 81q36 45.5 98 107T480-228Zm0-273Z" />
                  </svg>
                </button>
                <button
                  style={styles.addToCartButton}
                  onClick={() => dispatch(addToCartBeforeLogin(product))}
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart Main Button */}
            <div>
              <button
                style={styles.addToCartMainButton}
                onClick={() => dispatch(addToCartAPI(product))}
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Products;