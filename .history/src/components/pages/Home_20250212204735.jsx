import React from "react";
import "./LandingPage.css"; // Import the CSS file for styling

const  = () => {
  return (
    <div className="landing-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Welcome to Our Online Store</h1>
          <p>Discover the latest trends and shop your favorite products.</p>
          <button className="cta-button">Shop Now</button>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="featured-products">
        <h2>Featured Products</h2>
        <div className="product-grid">
          <div className="product-card">
            <img src="https://via.placeholder.com/150" alt="Product 1" />
            <h3>Product 1</h3>
            <p>$19.99</p>
            <button>Add to Cart</button>
          </div>
          <div className="product-card">
            <img src="https://via.placeholder.com/150" alt="Product 2" />
            <h3>Product 2</h3>
            <p>$29.99</p>
            <button>Add to Cart</button>
          </div>
          <div className="product-card">
            <img src="https://via.placeholder.com/150" alt="Product 3" />
            <h3>Product 3</h3>
            <p>$39.99</p>
            <button>Add to Cart</button>
          </div>
        </div>
      </section>

      {/* Promotional Banner */}
      <section className="promo-banner">
        <div className="promo-content">
          <h2>Big Sale! Up to 50% Off</h2>
          <p>Don't miss out on our exclusive deals. Limited time only!</p>
          <button className="cta-button">Shop the Sale</button>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials">
        <h2>What Our Customers Say</h2>
        <div className="testimonial-grid">
          <div className="testimonial-card">
            <p>"Great products and fast delivery! Highly recommend."</p>
            <h4>- Jane Doe</h4>
          </div>
          <div className="testimonial-card">
            <p>"Amazing customer service and quality products."</p>
            <h4>- John Smith</h4>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ;