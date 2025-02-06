import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const SelectedProduct = ({ api, selectedProduct, addToCart, addToWishList}) => {

  
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Fetch images from db.json
  useEffect(() => {
    fetch('/db.json')
      .then((response) => response.json())
      .then((data) => setImages(data.images))
      .catch((error) => console.error('Error fetching images:', error));
  }, []);

  // Handle next image
  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  // Handle previous image
  const prevImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  if (images.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div style={styles.slideshow}>
      <button onClick={prevImage} style={styles.button}>
        Previous
      </button>
      <img
        src={images[currentIndex]}
        alt={Slide ${currentIndex}}
        style={styles.image}
      />
      <button onClick={nextImage} style={styles.button}>
        Next
      </button>
    </div>
  );
};

// Styles
const styles = {
  slideshow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '20px',
  },
  image: {
    maxWidth: '100%',
    height: 'auto',
    borderRadius: '8px',
    margin: '0 10px',
  },
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    cursor: 'pointer',
  },
};



export default SelectedProduct;
