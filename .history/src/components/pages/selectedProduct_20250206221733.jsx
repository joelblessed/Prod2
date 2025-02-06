import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';

// Import slick-carousel CSS files
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const ProductsList = ({}) => {
  const [products, setProducts] = useState([]);

  // Fetch products from JSON server on component mount
  useEffect(() => {
    fetch(`${api}/products`)
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error("Error fetching products:", error));
  }, []);

  // Slider settings for product images
  const sliderSettings = {
    dots: true,           // Show navigation dots
    infinite: true,       // Loop slides infinitely
    speed: 500,           // Transition speed in ms
    slidesToShow: 1,      // One image per slide
    slidesToScroll: 1     // Scroll one image at a time
  };

  return (
    <div className="products-list" style={{ padding: "20px" }}>
      {products.map(product => (
        <div key={product.id} className="product" style={{ marginBottom: "40px", border: "1px solid #ddd", padding: "20px", borderRadius: "8px" }}>
          <h2>{product.title}</h2>
          <p>{product.description}</p>
          <p><strong>Price:</strong> {product.price}</p>
          {/* Check if product has images */}
          {product.images && product.images.length > 0 ? (
            <Slider {...sliderSettings}>
              {product.images.map((image, index) => (
                <div key={index}>
                  <img 
                    src={image} 
                    alt={`Product ${product.title} - Image ${index + 1}`} 
                    style={{ width: "100%", height: "auto", borderRadius: "8px" }} 
                  />
                </div>
              ))}
            </Slider>
          ) : (
            <p>No images available</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default ProductsList;