import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faTruck, faTags } from "@fortawesome/free-solid-svg-icons";
import "./LandingPage.css";

const LandingPage = () => {
  return (
    <div className="landing-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Shop the Best Deals</h1>
          <p>Exclusive discounts and premium quality products.</p>
          <a href="/shop" className="btn">Shop Now</a>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="feature">
          <FontAwesomeIcon icon={faTruck} className="icon" />
          <h3>Free Shipping</h3>
          <p>On all orders above $50.</p>
        </div>
        <div className="feature">
          <FontAwesomeIcon icon={faTags} className="icon" />
          <h3>Best Prices</h3>
          <p>Unbeatable discounts and offers.</p>
        </div>
        <div className="feature">
          <FontAwesomeIcon icon={faShoppingCart} className="icon" />
          <h3>Secure Checkout</h3>
          <p>100% safe and secure payments.</p>
        </div>
      </section>

      {/* Featured Products */}
      <section className="featured-products">
        <h2>Featured Products</h2>
        <div className="products-container">
          <div className="product">
            <img src="https://via.placeholder.com/200" alt="Product 1" />
            <h4>Product 1</h4>
            <p>$49.99</p>
            <a href="/product/1" className="btn">Buy Now</a>
          </div>
          <div className="product">
            <img src="https://via.placeholder.com/200" alt="Product 2" />
            <h4>Product 2</h4>
            <p>$39.99</p>
            <a href="/product/2" className="btn">Buy Now</a>
          </div>
          <div className="product">
            <img src="https://via.placeholder.com/200" alt="Product 3" />
            <h4>Product 3</h4>
            <p>$59.99</p>
            <a href="/product/3" className="btn">Buy Now</a>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} YourShop. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;