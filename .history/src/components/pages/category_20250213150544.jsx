import React from "react";





const Category = ({filteredProducts}) => {
  const groupedProducts = groupByCategory(products);

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

export default Category;