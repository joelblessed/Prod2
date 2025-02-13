mport React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const = () => {
  const { brandId } = useParams();
  const [products, setProducts] = useState([]);
  const [brand, setBrand] = useState(null);

  useEffect(() => {
    fetch("/db.json")
      .then((response) => response.json())
      .then((data) => {
        const filteredProducts = data.products.filter(
          (product) => product.brand[0].id === parseInt(brandId)
        );
        setProducts(filteredProducts);
        if (filteredProducts.length > 0) {
          setBrand(filteredProducts[0].brand[0]);
        }
      });
  }, [brandId]);

  if (!brand) return <div>Loading...</div>;

  return (
    <div>
      <h1>{brand.name} Products</h1>
      <div className="product-list">
        {products.map((product) => (
          <div key={product.id} className="product-box">
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default