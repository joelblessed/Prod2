import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const SelectedProduct = ({ api, selectedProduct, addToCart, addToWishList}) => {

  import React, { useState, useEffect } from 'react';

const ProductList = () => {
  const [products, setProducts] = useState([]);

  // Fetch products from db.json
  useEffect(() => {
    fetch('/db.json')
      .then((response) => response.json())
      .then((data) => setProducts(data.products))
      .catch((error) => console.error('Error fetching products:', error));
  }, []);

  if (products.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div style={styles.productList}>
      {products.map((product) => (
        <div key={product.id} style={styles.productCard}>
          <h2>{product.name}</h2>
          <p>${product.price.toFixed(2)}</p>
          <div style={styles.imageContainer}>
            {product.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`${product.name} - Image ${index + 1}`}
                style={styles.productImage}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

// Styles
const styles = {
  productList: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '20px',
    padding: '20px',
  },
  productCard: {
    border: '1px solid #ccc',
    borderRadius: '8px',
    padding: '16px',
    width: '300px',
    textAlign: 'center',
  },
  imageContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    marginTop: '10px',
  },
  productImage: {
    width: '100%',
    height: 'auto',
    borderRadius: '8px',
  },
};

export default ProductList;


export default SelectedProduct;
