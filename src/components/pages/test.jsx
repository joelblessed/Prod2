import React, { useState, useEffect} from 'react'

const Test = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
      fetch("http://localhost:5000/products") // Fetch products from API
          .then((response) => response.json())
          .then((data) => setProducts(data))
          .catch((error) => console.error("Error fetching products:", error));
  }, []);

  return (
      <div style={{  marginTop: "20px",display: 'flex', flexWrap: 'wrap' }}>
          <h1>Product List</h1>
          {products.length > 0 ? (
              products.map((product) => (
                  <div key={product.id} style={{ 
                      border: "1px solid #ddd", 
                      padding: "20px", 
                      borderRadius: "8px", 
                      maxWidth: "400px", 
                      margin: "20px"
                  }}>
                      {product.images.length > 0 ? (
                          <img
                              src={product.images[0]} // Display first image only
                              alt={product.name}
                              style={{
                                  width: "300px",
                                  height: "300px",
                                  objectFit: "cover",
                                  borderRadius: "8px",
                              }}
                          />
                      ) : (
                          <p>No image available</p>
                      )}
                      <h2>{product.name}</h2>
                      <p>{product.description}</p>
                      <h3 style={{ color: "green" }}>${product.price}</h3>

                    
                  </div>
              ))
          ) : (
              <p>Loading...</p>
          )}
      </div>
  );
};


export default Test
