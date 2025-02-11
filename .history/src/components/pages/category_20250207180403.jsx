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
}) {
  const [items, setItems] = useState([]);

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

  return (
 <></>
  );
}

export default Category;
