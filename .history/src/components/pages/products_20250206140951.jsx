import React, { useEffect, useState } from 'react';
import "./products.css"
import { useNavigate } from 'react-router-dom';


const Products = ({api,loading,images, filteredProducts, setSelectedProduct , addToCart, handleShowAlert ,showAlert, searchTerm, highlightText}) => {
 const [currentIndex, setCurrentIndex] = useState(0)

  
  const navigate = useNavigate();
  const handleProductClick = (product) => {
    setSelectedProduct(product);
    navigate("/selectedProduct")
  };
  const nextImage =() =>{
    setCurrentIndex((prevIndex) => (prevIndex +1) %images.length) 
  }

  return (
    <>
  

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
                         <span className='text'>
                            <a  className='name'><span style={{color:"black"}} 
                                dangerouslySetInnerHTML={{
                                __html: highlightText(product.name, searchTerm),
                                       }}
                                 ></span> </a>
                            <a>Description: {product.desc}</a>
                            <a>Price: {product.price}</a>
                         </span>

                    
                  </div>
              ))
          ) : (
              <p>Loading...</p>
          )}
      </div>
            </>
  )
}

export default Products
