import React from "react";
import "./LandingPage.css"; // Import the CSS file for styling

const LandingPage = () => {
  // Dummy data for demonstration
  const promotions = [
    {
      id: 1,
      title: "Summer Sale",
      description: "Up to 50% off on selected items!",
      image: "https://via.placeholder.com/800x300",
    },
    {
      id: 2,
      title: "New Arrivals",
      description: "Check out the latest trends.",
      image: "https://via.placeholder.com/800x300",
    },
  ];

  const categories = [
    { id: 1, name: "Electronics", image: "https://via.placeholder.com/150" },
    { id: 2, name: "Fashion", image: "https://via.placeholder.com/150" },
    { id: 3, name: "Home & Kitchen", image: "https://via.placeholder.com/150" },
    { id: 4, name: "Beauty", image: "https://via.placeholder.com/150" },
  ];

  const topSellingItems = [
    {
      id: 1,
      name: "Smartphone X",
      price: "$699",
      image: "https://via.placeholder.com/150",
    },
    {
      id: 2,
      name: "Wireless Headphones",
      price: "$199",
      image: "https://via.placeholder.com/150",
    },
    {
      id: 3,
      name: "Smart Watch",
      price: "$249",
      image: "https://via.placeholder.com/150",
    },
  ];

  const lastViewedProduct = {
    id: 1,
    name: "Laptop Pro",
    price: "$1299",
    image: "https://via.placeholder.com/150",
  };

  return (
    <div className="landing-page">
      {/* Promotions Section */}
      <section className="promotions">
        <h2>Promotions</h2>
        <div className="promotion-grid">
          {promotions.map((promo) => (
            <div key={promo.id} className="promotion-card">
              <img src={promo.image} alt={promo.title} />
              <div className="promo-content">
                <h3>{promo.title}</h3>
                <p>{promo.description}</p>
                <button className="cta-button">Shop Now</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories">
        <h2>Shop by Category</h2>
        <div className="category-grid">
          {categories.map((category) => (
            <div key={category.id} className="category-card">
              <img src={category.image} alt={category.name} />
              <h3>{category.name}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* Top Selling Items Section */}
      <section className="top-selling">
        <h2>Top Selling Items</h2>
        <div className="product-grid">
          {topSellingItems.map((product) => (
            <div key={product.id} className="product-card">
              <img src={product.image} alt={product.name} />
              <h3>{product.name}</h3>
              <p>{product.price}</p>
              <button>Add to Cart</button>
            </div>
          ))}
        </div>
      </section>

      {/* Last Viewed Product Section */}
      <section className="last-viewed">
        <h2>Last Viewed Product</h2>
        <div className="product-card">
          <img src={lastViewedProduct.image} alt={lastViewedProduct.name} />
          <h3>{lastViewedProduct.name}</h3>
          <p>{lastViewedProduct.price}</p>
          <button>Add to Cart</button>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;