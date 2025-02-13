import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const ProductsByCategory = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  const groupByCategory = (products) => {
    return products.reduce((acc, product) => {
      if (!acc[product.category]) acc[product.category] = [];
      acc[product.category].push(product);
      return acc;
    }, {});
  };

  const groupedProducts = groupByCategory(products);

  return (
    <div style={styles.container}>
      {Object.keys(groupedProducts).map((category, index) => (
        <div key={index} style={styles.categoryContainer}>
          <h2 style={styles.categoryTitle}>{category}</h2>
          <div style={styles.productsGrid}>
            {groupedProducts[category].slice(0, 3).map((product) => (
              <div key={product.id} style={styles.productBox}>
                <img src={product.image} alt={product.name} style={styles.image} />
                <p>{product.name}</p>
              </div>
            ))}
          </div>
          <Link to={/category/${category}} style={styles.viewMoreButton}>
            View More
          </Link>
        </div>
      ))}
    </div>
  );
};

const styles = {
  container: { width: "80%", margin: "auto" },
  categoryContainer: { marginBottom: "20px" },
  categoryTitle: { color: "teal" },
  productsGrid: { display: "flex", flexWrap: "wrap", gap: "10px" },
  productBox: {
    width: "120px",
    height: "150px",
    backgroundColor: "lightgray",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "8px",
  },
  image: { width: "80px", height: "80px", objectFit: "cover" },
  viewMoreButton: {
    display: "inline-block",
    marginTop: "10px",
    padding: "8px 15px",
    backgroundColor: "teal",
    color: "white",
    textDecoration: "none",
    borderRadius: "5px",
  },
};

export default ProductsByCategory;