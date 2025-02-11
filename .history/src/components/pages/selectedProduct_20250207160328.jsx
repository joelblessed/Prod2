import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';

// Import slick-carousel CSS files
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const SelectedProduct = ({api, SelectedProduct}) => {
 
  const [product, setProduct] = useState(null);

  // Fetch the products on component mount
  useEffect(() => {
    fetch(`${api}/products`) // Adjust the URL to your JSON API endpoint
      .then(response => response.json())
      .then(data => {
        // Find the selected product (you can adjust this logic as needed)
        const selectedProduct = data.find(prod => prod.isSelected);
        setProduct(selectedProduct);
      })
      .catch(error => console.error("Error fetching products:", error));
  }, []);

  // Slider settings for displaying product images
  const sliderSettings = {
    dots: true,          // Show navigation dots
    infinite: true,      // Enable infinite looping
    speed: 100,          // Transition speed (ms)
    slidesToShow: 1,     // Show one image at a time
    slidesToScroll: 1,   // Scroll one image per action
    autoplay: true,
    autoplaySpeed: 3000  // Autoplay speed (ms)
  };

  if (!product) {
    return <div>Loading product...</div>;
  }

  return (
    <div style={{ padding: "20px", margin: "0 auto", maxWidth: "800px", border:"10px solid"}}>
      <div >
      <div style={{background:"red"}}>
      <h1>{product.title}</h1>
      <p>{product.description}</p>
      <p><strong>Price:</strong> {product.price}</p>
      </div>
      <div style={{background:"yellow", width:"400px"}}>
      {product.images && product.images.length > 0 ? (
        <Slider {...sliderSettings}>
          {product.images.map((imgUrl, index) => (
            <div key={index}>
              <img 
                src={imgUrl} 
                alt={`${product.title} - Image ${index + 1}`} 
                style={{ width: "1%", height: "auto", borderRadius: "8px" }} 
              />
            </div>
          ))}
        </Slider>
      ) : (
        <p>No images available</p>
      )}
      </div>
      </div>
    </div>
  );
};


export default SelectedProduct;