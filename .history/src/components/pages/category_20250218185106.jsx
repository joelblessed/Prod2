import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Category({
  api,
  addToCart,
  searchTerm,
  highlightText,
  addToWishList,
  setSelectedProduct,
  selectedCategory,
  filteredProducts
}) {
  
  const navigate = useNavigate();
  const handleProductClick = (product) => {
    setSelectedProduct(product);
    navigate("/selectedProduct");
  };

  return (
    <>
    </>
  );
}

export default Category;
