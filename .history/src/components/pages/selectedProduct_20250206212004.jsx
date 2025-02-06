import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const SelectedProduct = ({ api, selectedProduct, addToCart, addToWishList}) => {

  
    
      const [product, setProducts] = useState(selectedProduct);
    
      // useEffect(() => {
      //   // Adjust the URL according to your JSON server's configuration
      //   fetch(`${api}/products`)
      //     .then((response) => response.json())
      //     .then((data) => {
      //       // Filter products that are selected
      //       const selectedProducts = data.filter(product => product.isSelected);
      //       setProducts(selectedProducts);
      //     })
      //     .catch((error) => console.error("Error fetching products:", error));
      // }, []);
    
      // Slider settings (customize as needed)
      const settings = {
        dots: true,             // Show navigation dots
        infinite: true,         // Enable infinite looping
        speed: 500,             // Transition speed in ms
        slidesToShow: 1,        // Number of slides to show at once
        slidesToScroll: 1,      // Number of slides to scroll on each transition
        autoplay: true,         // Auto-play slides
        autoplaySpeed: 3000     // Auto-play speed in ms
      };
    
      return (
        <div style={{ width: "80%", margin: "0 auto" }}>
          <h2>Selected Products</h2>
        
              <div key={product.id} style={{ padding: "10px" }}>
                
                <img
                  src={product.images}
                  alt={product.name}
                  style={{ width: "100%", height: "auto", borderRadius: "8px" }}
                />
                <div style={{ padding: "10px 0" }}>
                  <h3>{product.name}</h3>
                  <p>{product.description}</p>
                  <p>Price: {product.price}</p>
                </div>
              </div>
            
          </Slider>
        </div>
      );
    };
    
   


export default SelectedProduct;
