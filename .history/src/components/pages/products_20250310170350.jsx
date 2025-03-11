import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCartBeforeLogin, addToCartAPI } from "../../cartAction";
import { addToWishListAPI } from "../../wishlistAction";

const Products = ({
  api,
  filteredProducts,
  setSelectedProduct,
  highlightText,
  searchTerm,
}) => {
  const [isMobile, setIsMobile] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 760);
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    localStorage.setItem("selectedProduct", JSON.stringify(product));
    navigate("/selectedProduct");
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
      maxWidth: "96%",
      margin: "auto",
      padding: "20px",
      marginTop: "50px",
    },
    productCard: {
      border: "1px solid #ddd",
      borderRadius: "12px",
      width: "250px",
      height: "350px",
      overflow: "hidden",
      transition: "transform 0.3s ease-in-out",
    },
    productImage: {
      width: "100%",
      height: "250px",
      objectFit: "cover",
      borderRadius: "10px",
      cursor: "pointer",
      transition: "transform 0.3s ease",
    },
    productDetails: {
      display: "flex",
      flexDirection: "column",
      padding: "10px",
      background: "linear-gradient(45deg, white 33%, white 33%, #86a8e7 66%, #91eae4 66%)",
      borderRadius: "10px",
    },
    productName: {
      color: "black",
      fontSize: "18px",
      fontWeight: "bold",
    },
    productDescription: {
      color: "gray",
      fontSize: "14px",
    },
    productPrice: {
      fontSize: "16px",
      color: "#333",
      fontWeight: "bold",
    },
    actions: {
      display: "flex",
      justifyContent: "space-between",
      padding: "10px 0",
    },
    button: {
      backgroundColor: "transparent",
      border: "1px solid #ddd",
      borderRadius: "5px",
      padding: "5px 10px",
      cursor: "pointer",
      transition: "background-color 0.3s ease",
    },
    buttonHover: {
      backgroundColor: "#f0f0f0",
    },
  };

  const [hoveredProductId, setHoveredProductId] = useState(null);

  return (
    <div style={styles.container}>
      {filteredProducts.length > 0 ? (
        filteredProducts.map((product) => (
          <div
            key={product.id}
            style={{
              ...styles.productCard,
              transform: hoveredProductId === product.id ? "scale(1.05)" : "scale(1)",
            }}
            onMouseEnter={() => setHoveredProductId(product.id)}
            onMouseLeave={() => setHoveredProductId(null)}
          >
            <img
              src={product.images[0]}
              alt={product.name}
              style={styles.productImage}
              onClick={() => handleProductClick(product)}
            />
            <div style={styles.productDetails}>
              <h5
                style={styles.productName}
                dangerouslySetInnerHTML={{
                  __html: highlightText(product.name, searchTerm),
                }}
              />
              <p style={styles.productDescription}>{product.description}</p>
              <p style={styles.productPrice}>{product.price}</p>
            </div>
            <div style={styles.actions}>
              <button
                style={{
                  ...styles.button,
                  ...(hoveredProductId === product.id ? styles.buttonHover : {}),
                }}
                onClick={() => dispatch(addToCartBeforeLogin(product))}
              >
                Add to Cart
              </button>
              <button
                style={styles.button}
                onClick={() => dispatch(addToWishListAPI(product))}
              >
                Add to Wishlist
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