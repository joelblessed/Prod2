import React from "react";

const products = [
  { id: 1, name: "Laptop", category: "Electronics" },
  { id: 2, name: "Phone", category: "Electronics" },
  { id: 3, name: "T-shirt", category: "Clothing" },
  { id: 4, name: "Jeans", category: "Clothing" },
  { id: 5, name: "Headphones", category: "Electronics" },
  { id: 6, name: "Sneakers", category: "Footwear" },
];

// Group products by category
const groupByCategory = (products) => {
  return products.reduce((acc, product) => {
    if (!acc[product.category]) {
      acc[product.category] = [];
    }
    acc[product.category].push(product);
    return acc;
  }, {});
};

const ProductsByCategory = () => {
  const groupedProducts = groupByCategory(products);

  return (
    <div style={styles.container}>
      {Object.keys(groupedProducts).map((category, index) => (
        <div key={index} style={styles.categoryContainer}>
          <h2 style={styles.categoryTitle}>{category}</h2>
          <div style={styles.productsGrid}>
            {groupedProducts[category].map((product) => (
              <div key={product.id} style={styles.productBox}>
                {product.name}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

const styles = {
  container: {
    width: "80%",
    margin: "auto",
  },
  categoryContainer: {
    marginBottom: "20px",
  },
  categoryTitle: {
    color: "teal",
  },
  productsGrid: {
    display: "flex",
    flexWrap: "wrap",
    gap: "10px",
  },
  productBox: {
    width: "120px",
    height: "120px",
    backgroundColor: "lightgray",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "8px",
  },
};

export default ProductsByCategory;