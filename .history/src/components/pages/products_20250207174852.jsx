import React, { useEffect, useState } from "react";
import "./products.css";
import { useNavigate } from "react-router-dom";

const Products = ({
  api,
  loading,
  images,
  filteredProducts,
  setSelectedProduct,
  addToCart,
  handleShowAlert,
  showAlert,
  searchTerm,
  highlightText,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [products, setProducts] = useState([]);

  const navigate = useNavigate();
  const handleProductClick = (product) => {
    setSelectedProduct(product);
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

  return (
    <>
      <div
        className=""
        style={{ marginTop: "20px", display: "flex", flexWrap: "wrap" }}
      >
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div
              key={product.id}
              style={{
                border: "1px solid red",
                borderRadius: "10px",
                maxWidth: "400px",
                maxHeight: "600px",
                margin: "15px",
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
                  // onClick={() => handleProductClick(product)}

                  onClick={() =>
                    toggleSelection(
                      product.id,
                      product.isSelected,
                      navigate("/selectedProduct")
                    )
                  }
                />
              ) : (
                <p>No image available</p>
              )}
              <span
                className="text"
                style={{
                  background:
                    " linear-gradient(-45deg, red 33%, #feb47b 33% 66%, white 66%)",
                    borderRadius:"10PX"
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
                <h5>Description: {product.desc}</h5>
                <h5>
                  Price: {product.price}{" "}
                  <button  style={{
                      background: "transparent",
                      border: "1px solid RED",
                      color: "red",
                      padding: "10px 20px",
                      borderRadius: "10px 10px 10px 10px ",
                      cursor: "pointer",
                      fontSize: "100%",
                      transition: "all 0.3s ease",
                      
                    }} onClick={() => addToCart(product)}>+</button>
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
