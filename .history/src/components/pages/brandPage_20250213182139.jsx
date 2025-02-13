import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [isAllProductsVisible, setIsAllProductsVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setDisplayedProducts(data.slice(0, 4)); // Display only the first 4 products initially
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  const handleShowMore = () => {
    setDisplayedProducts(products);
    setIsAllProductsVisible(true);
  };

  // Group products by brand
  const groupedByBrand = products.reduce((acc, product) => {
    const { brand } = product;
    if (!acc[brand.id]) {
      acc[brand.id] = { ...brand, products: [] };
    }
    acc[brand.id].products.push(product);
    return acc;
  }, {});

  return (
    <div>
      <h1>Products</h1>
      {Object.values(groupedByBrand).map((brand) => (
        <div key={brand.id} style={styles.brandContainer}>
          <h2>{brand.name}</h2>
          <img src={brand.image} alt={brand.name} style={styles.brandImage} />
          
          <div style={styles.productsGrid}>
            {displayedProducts
              .filter((product) => product.brand.id === brand.id)
              .map((product) => (
                <div key={product.id} style={styles.productBox}>
                  <img
                    src={product.image}
                    alt={product.name}
                    style={styles.productImage}
                  />
                  <p>{product.name}</p>
                </div>
              ))}
          </div>

          {!isAllProductsVisible && (
            <button onClick={handleShowMore} style={styles.showMoreButton}>
              Show More Products
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

const styles = {
  brandContainer: { marginBottom: "30px" },
  brandImage: { width: "100px", height: "100px", objectFit: "contain" },
  productsGrid: { display: "flex", gap: "15px", flexWrap: "wrap" },
  productBox: {
    width: "150px",
    padding: "10px",
    textAlign: "center",
    background: "#f5f5f5",
    borderRadius: "8px",
  },
  productImage: { width: "100px", height: "100px", objectFit: "contain" },
  showMoreButton: {
    padding: "10px 20px",
    background: "#007BFF",
    color: "#fff",
    border: "none",
    cursor: "pointer",
    marginTop: "10px",
  },
};

export default ProductsPage;