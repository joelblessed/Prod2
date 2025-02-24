import React, { useEffect, useState } from "react";
import "./products.css";
import { useNavigate } from "react-router-dom";

const Products = ({
  filteredProducts,
  setSelectedProduct,
  addToCart,
  addTowishList,
  highlightText,
  searchTerm,
  selectedCategory,
}) => {
  const [visibleItems, setVisibleItems] = useState([]);

  const navigate = useNavigate();
  
  const handleProductClick = (product) => {
    setSelectedProduct(product);
    localStorage.setItem("selectedProduct", product);
    navigate("/selectedProduct");
  };

  // Use the Intersection Observer for fade-in effect
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setVisibleItems((prevVisibleItems) => [
            ...prevVisibleItems,
            entry.target,
          ]);
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
    <div className="container">
      {filteredProducts.length > 0 ? (
        filteredProducts.map((product, index) => (
          <div
            key={product.id}
            className={fade-box ${visibleItems.includes(product.id) ? "visible" : ""}}
            style={{
              opacity: visibleItems.includes(product.id) ? 1 : 0,
              transition: "opacity 1s ease",
              transform: visibleItems.includes(product.id) ? "translateY(0)" : "translateY(50px)",
            }}
          >
            <div className="product-card">
              {product.images.length > 0 ? (
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="product-image"
                  onClick={() => handleProductClick(product)}
                />
              ) : (
                <p>No image available</p>
              )}

              <div className="product-info">
                <h5
                  dangerouslySetInnerHTML={{
                    __html: highlightText(product.name, searchTerm),
                  }}
                />
                <p>Description: {product.desc}</p>
                <p>Price: {product.price}</p>

                <button
                  className="add-to-wishlist-btn"
                  onClick={() => addTowishList(product)}
                >
                  Add to Wishlist
                </button>

                <button
                  className="add-to-cart-btn"
                  onClick={() => addToCart(product)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>No products available</p>
      )}
    </div>
  );
};

export default Products;