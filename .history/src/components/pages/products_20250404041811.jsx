import React, { useEffect, useState, useRef } from "react";
import "./products.css";
import { useNavigate, Link } from "react-router-dom";
import "../translations/i18n";
import Box from "./boxes";

const Products = ({
  filteredProducts,
  SelectedProduct,
  highlightText,
  isInWishlist,
  handleWislistToggle
 
}) => {

  const navigate = useNavigate();
  
  const handleProductClick = (product) => {
    SelectedProduct(product);
    localStorage.setItem("selectedProduct", product);
    navigate("/selectedProduct");
  };
  
handleWishlistToggle({ productId: product.id, userId } )}
  return (
    <div>
      <div>
        <Box
          Mobject={filteredProducts}
          Dobject={filteredProducts}
          handleProductClick={handleProductClick}
          highlightText={highlightText}
          handleWislistToggle={handleWislistToggle}
          isInWishlist={isInWishlist}
          
        />
      </div>
    </div>
  );
};

export default Products;
