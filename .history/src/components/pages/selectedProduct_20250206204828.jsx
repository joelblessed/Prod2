import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const SelectedProduct = ({ api, selectedProduct, addToCart, addToWishList}) => {
    // Array of slide data (image + details)
    const slides = [
      {
        id: 1,
        image: "https://via.placeholder.com/600x400?text=Image+1",
        title: "Beautiful Landscape",
        description: "A beautiful landscape with mountains and rivers."
      },
      {
        id: 2,
        image: "https://via.placeholder.com/600x400?text=Image+2",
        title: "City Lights",
        description: "The vibrant city life under the night sky."
      },
      {
        id: 3,
        image: "https://via.placeholder.com/600x400?text=Image+3",
        title: "Serene Beach",
        description: "Relaxing beach vibes with crystal clear water."
      },
      {
        id: 4,
        image: "https://via.placeholder.com/600x400?text=Image+4",
        title: "Majestic Forest",
        description: "The lush greenery of an expansive forest."
      }
    ];
  // Slider settings - adjust as needed
  const settings = {
    dots: true,             // Show navigation dots
    infinite: true,         // Enable infinite looping
    speed: 500,             // Transition speed in milliseconds
    slidesToShow: 1,        // Number of slides to show at once
    slidesToScroll: 1,      // Number of slides to scroll on each action
    autoplay: true,         // Auto-play slides
    autoplaySpeed: 3000     // Auto-play speed in milliseconds
  };
  return (

    <div style={{ width: "80%", margin: "0 auto" }}>
      <Slider {...settings}>
        {slides.map(slide => (
          <div key={slide.id} style={{ padding: "10px" }}>
            <img
              src={slide.image}
              alt={slide.title}
              style={{ width: "100%", height: "auto", borderRadius: "8px" }}
            />
            <div style={{ padding: "10px 0" }}>
              <h3>{slide.title}</h3>
              <p>{slide.description}</p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};


export default SelectedProduct;
