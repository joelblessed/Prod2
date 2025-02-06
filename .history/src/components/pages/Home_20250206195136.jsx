import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./products.css";

// import { createContext,useState,useContext } from 'react';

const Home = ({
  api,
  recieveName,
  filteredProducts,
  setSelectedProduct,
  addToCart,
  addToWishList,
  loading,
  handleShowAlert,
  showAlert,
  searchTerm,
  highlightText,
}) => {
  // const DataContext = createContext();

  // Handle product click
  // const {setSelectedProduct} = useContext(DataContext)

  const navigate = useNavigate();
  const handleProductClick = (product) => {
    setSelectedProduct(product);
    navigate("/selectedProduct");
  };

  return (
    <>
    <div style={{  marginTop: "20px",display: 'flex', flexWrap: 'wrap' }}>
       <h1>{recieveName}</h1>
          {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                  <div key={product.id} style={{ 
                      border: "1px solid #ddd", 
                      borderRadius: "8px", 
                      maxWidth: "400px",
                      maxHeight:"600px",
                      margin: "15px"
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
                         <span className='text'>
                            <h5  className='name'><span style={{color:"black"}} 
                                dangerouslySetInnerHTML={{
                                __html: highlightText(product.name, searchTerm),
                                       }}
                                 ></span> </h5>
                            <h5>Description: {product.desc}</h5>
                            <h5>Price: {product.price}</h5>
                            <div><button onClick={() => addToCart(product)}>addToCart</button> <button onClick={() => addToWishList(product)}>+wisList</button></div>
                         </span>

                    
                  </div>
              ))
          ) : (
              <p>Loading...</p>
          )}
      </div>
            </>
  );
};

export default Home;
