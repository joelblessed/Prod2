import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const BrandPage = ({filteredProducts}) => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch()
      .then((response) => response.json())
      .then((data) => setProducts(data.products));
  }, []);

  const brands = products.reduce((acc, product) => {
    if (!acc.some((brand) => brand.id === product.brand.id)) {
      acc.push(product.brand);
    }
    return acc;
  }, []);

  return (
    <div>
      <h1>All Brands</h1>
      <div className="brands">
        {brands.map((brand) => (
          <div key={brand.id} className="brand-box">
            <img src={brand.image} alt={brand.name} />
            <h3>{brand.name}</h3>
          </div>
        ))}
      </div>
      <button onClick={() => navigate("/")}>Back</button>
    </div>
  );
};

export default BrandPage