import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./products.css";

function Category({
  api,
  addToCart,
  searchTerm,
  highlightText,
  addToWishList,
  setSelectedProduct,
  selectedCategory,
}) {
  const [items, setItems] = useState([]);
  const [product, setProducts] = useState(null);

  const [filteredItems, setFilteredItems] = useState([]);

  // Fetch items from db.json (JSON Server)
  useEffect(() => {
    fetch(`${api}/products`)
      .then((response) => response.json())
      .then((data) => {
        setItems(data); // Store all items
        setFilteredItems(data); // Set initial filtered items
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  // Filter items based on selected category
  useEffect(() => {
    if (selectedCategory === "All") {
      setFilteredItems(items);
    } else {
      setFilteredItems(
        items.filter((item) => item.category === selectedCategory)
      );
    }
  }, [selectedCategory, items]); // Re-run filter when category or items change

  const filteredProducts = filteredItems.filter(
    (product) =>
      product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const navigate = useNavigate();
  const handleProductClick = (product) => {
    setSelectedProduct(product);
    navigate("/selectedProduct");
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

    lastBox: {
      marginLeft: "auto", // Pushes last box to the left
    },
  };

  return (
 <>
 
      <div
        className="box1"
        style={{ marginTop: "20px", display: "flex", flexWrap: "wrap" }}
      >
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product, index) => (
            <div className="box2"
              key={product.id}
              style={{
                ...styles.box,
                ...(index === product.length - 1 ? styles.lastBox : {}), // Apply style only to the last box
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
                    " linear-gradient(-45deg,RED 33%, #feb47b 33%, #86a8e7 66%, #91eae4 66%)",
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
                      border: "1px solid orange",
                      color: "orange",
                      padding: "0px 20px",
                      borderRadius: "10px 10px 10px 10px ",
                      cursor: "pointer",
                      fontSize: "40px",
                      fontWeight:"bold",
                      transition: "all 0.3s ease",
                      marginLeft:"140px"
                      
                    }} onClick={() => addToWishList(product)}>+</button>
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
}

export default Category;
