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
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 760);
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navigate = useNavigate();
  const handleProductClick = (product) => {
    setSelectedProduct(product);
    localStorage.setItem("selectedProduct", product);
    navigate("/selectedProduct");
  };

  // Fade-in effect with Intersection Observer
  const [visibleItems, setVisibleItems] = useState([]);

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
  }, []);

  return (
    <div className="container">
      <h2>Selected Category: {selectedCategory}</h2>

      {filteredProducts.length > 0 ? (
        filteredProducts.map((product, index) => (
          <div
            key={product.id}
            className={`fade-box ${visibleItems.includes(product.id) ? "visible" : ""}}
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
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Products