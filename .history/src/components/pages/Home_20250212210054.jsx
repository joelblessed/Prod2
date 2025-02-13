import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTag, faList, faFire } from "@fortawesome/free-solid-svg-icons";
import "./Home.css";

const Home = () => {
  // Simulating API data
  const topSelling = [
    { id: 1, name: "Wireless Headphones", price: "$59.99", img: "https://via.placeholder.com/200" },
    { id: 2, name: "Smart Watch", price: "$99.99", img: "https://via.placeholder.com/200" },
    { id: 3, name: "Gaming Mouse", price: "$49.99", img: "https://via.placeholder.com/200" },
  ];

  const categories = [
    { name: "Electronics", img: "https://via.placeholder.com/150" },
    { name: "Clothing", img: "https://via.placeholder.com/150" },
    { name: "Home & Kitchen", img: "https://via.placeholder.com/150" },
  ];

  // Get last viewed items from localStorage
  const [lastViewed, setLastViewed] = useState([]);

  useEffect(() => {
    const viewedItems = JSON.parse(localStorage.getItem("lastViewed")) || [];
    setLastViewed(viewedItems);
  }, []);

  return (
    <div className="landing-page">
      {/* Promotions Section */}
      <section className="promotion">
        <h2><FontAwesomeIcon icon={faTag} /> Special Discounts</h2>
        <p>Get up to 50% off on selected items!</p>
        <a href="/deals" className="btn">Shop Deals</a>
      </section>

      {/* Categories Section */}
      <section className="categories">
        <h2><FontAwesomeIcon icon={faList} /> Shop by Category</h2>
        <div className="category-container">
          {categories.map((cat, index) => (
            <div key={index} className="category">
              <img src={cat.img} alt={cat.name} />
              <p>{cat.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Top Selling Items */}
      <section className="top-selling">
        <h2><FontAwesomeIcon icon={faFire} /> Best Sellers</h2>
        <div className="product-container">
          {topSelling.map((item) => (
            <div key={item.id} className="product">
              <img src={item.img} alt={item.name} />
              <h4>{item.name}</h4>
              <p>{item.price}</p>
              <a href={`/product/${item.id}`} className="btn">Buy Now</a>
            </div>
          ))}
        </div>
      </section>

      {/* Last Viewed Products */}
      {lastViewed.length > 0 && (
        <section className="last-viewed">
          <h2>Recently Viewed</h2>
          <div className="product-container">
            {lastViewed.map((item, index) => (
              <div key={index} className="product">
                <img src={item.img} alt={item.name} />
                <h4>{item.name}</h4>
                <p>{item.price}</p>
                <a href={`/product/${item.id}`} className="btn">View Again</a>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} YourShop. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default Home;