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
  

    
            </>
  )
}

export default Products
