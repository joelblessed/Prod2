import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import "./products.css";

const CategoryPage = ({highlightText, addToCart, addTowishList, handleProductClick, searchTerm}) => {
  const { categoryName } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/products")
      .then((res) => res.json())
      .then((data) => {
        const filteredProducts = data.filter((product) => product.category === categoryName);
        setProducts(filteredProducts);
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, [categoryName]);

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
      marginTop: "90px",
    },
    box: {
      
     
    },

    lastBox: {
      background: "blue",
      
      // Pushes last box to the left
    },
  };
  return (
    <div>
      <h1>{categoryName}</h1>
     

      <Link to="/" style={styles.backButton}>Back</Link>
    </div>
  );
};


export default CategoryPage;