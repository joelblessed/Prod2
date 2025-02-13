import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const BrandPage = ({filteredProducts}) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [brand, setBrand] = useState(null
  useEffect(() => {
    fetch(`http://localhost:5000/products/${id}`)
      .then((res) => res.json())
      .then((data) => setBrand(data))
      .catch((error) => console.error("Error fetching brand:", error));
  }, [id]);

  if (!brand) return <h2>Loading...</h2>;

  return (
    <div style={styles.container}>
      <h1>{brand.name} Products</h1>
      <button onClick={() => navigate(-1)} style={styles.backButton}>Go Back</button>
      <div style={styles.productsGrid}>
        {brand.products.map((product) => (
          <div key={product.id} style={styles.productBox}>
            <img src={product.image} alt={product.name} style={styles.image} />
            <p>{product.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: { width: "80%", margin: "auto", textAlign: "center" },
  backButton: { marginBottom: "15px", padding: "10px", cursor: "pointer" },
  productsGrid: { display: "flex", flexWrap: "wrap", gap: "15px", justifyContent: "center" },
  productBox: {
    width: "180px",
    height: "200px",
    backgroundColor: "#f5f5f5",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "8px",
    padding: "10px",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)"
  },
  image: { width: "100px", height: "100px", objectFit: "contain", marginBottom: "10px" }
};

export default BrandPage;