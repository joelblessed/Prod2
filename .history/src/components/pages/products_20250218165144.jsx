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
    localStorage.setItem("selectedProduct", product);
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
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "center",
      alignItems: "center",
      gap: "20px",
      background: "red",
      maxWidth: "96%", // Prevents full width spread
      margin: "auto", // Centers the whole container
      padding: "20px",
      marginTop: "90px",
    },
    box: {
      background: "green",
    },

    lastBox: {
      background: "blue",
      // Pushes last box to the left
    },
  };

  return (
    <>
      <div style={styles.container}>
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product, index) => (
            <div>
              <div
                className="animated-box"
                key={index}
                style={{
                  ...styles.box,

                  justifyContent:
                    index === filteredProducts.length - 1 ? "space-evenly" : {}, // Apply style only to the last box
                }}
              >
                {product.images.length > 0 ? (
                  <img
                    src={product.images[0]} // Display first image only
                    alt={product.name}
                    style={{
                      width: "250px",
                      height: "250px",
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
                    borderRadius: "10PX",
                    width: "250px",
                    height: "1px",
                  }}
                >
                  <h5 className="name">
                    <span
                      style={{ color: "black" }}
                      dangerouslySetInnerHTML={{
                        __html: highlightText(product.name, searchTerm),
                      }}
                    ></span>{" "}
                    <button>
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
                  </h5>
                  <h6>Description: {product.desc}</h6>
                  <h6>
                    Price: {product.price}{" "}
                    <button
                      style={{
                        background: "transparent",
                        // border: "1px solid orange",
                        color: "orange",
                        padding: "0px 0px",
                        background:"none",
                        // borderRadius: "10px 10px 10px 10px ",
                        cursor: "pointer",
                        fontSize: "30px",
                        fontWeight: "bold",
                        transition: "all 0.3s ease",
                        marginRight: "auto",
                      }}
                      onClick={() => addTowishList(product)}
                    >
                      +
                    </button>
                  </h6>
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
