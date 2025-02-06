import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const SelectedProduct = ({ api, selectedProduct, addToCart, addToWishList}) => {

  
  const [pro, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Fetch pro from db.json
  useEffect(() => {
    fetch(`${api}/products`)
      .then((response) => response.json())
      .then((data) => setImages(data.pro))
      .catch((error) => console.error('Error fetching pro:', error));
  }, []);

  // Handle next image
  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % pro.imageslength);
  };

  // Handle previous image
  const prevImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? pro.length - 1 : prevIndex - 1
    );
  };

  if (pro.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div style={styles.slideshow}>
      <button onClick={prevImage} style={styles.button}>
        Previous
      </button>
      <img
        src={pro[currentIndex]}
        alt={`Slide ${currentIndex}`}
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
