import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Category({
  api,
  addToCart,
  
  highlightText,
  addToWishList,
  setSelectedProduct,
  selectedCategory,
  searchTerm,
  setSearchTerm,

  
  
  
  
 
}) {
const [catsearch, setCartSearch] = useState(handleSearch)

  const [products, setProducts] = useState([]); // full list of products
  const [filteredProducts, setFilteredProducts] = useState([]); // filtered list
  // const [searchTerm, setSearchTerm] = useState("");// single input for filtering
  const [categories, setCategories] = useState([]); // Unique categories
  // Fetch products from db.json when the component mounts
  useEffect(() => {
    fetch(`${api}/products`)
      .then((response) => response.json())
      .then((data) => {
        const productsData = data.products || data;
        setProducts(productsData);
        setFilteredProducts(productsData);

        // Extract unique categories from the products
        const uniqueCategories = [
          ...new Set(productsData.map((product) => product.category)),
        ];
        setCategories(uniqueCategories);
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  // Handle filtering logic
  const handleSearch = () => {
    const query = searchTerm.trim().toLowerCase();

    let filtered = products.filter((product) => {
      const categoryMatch = product.category.toLowerCase().includes(query);
      const productNameMatch = product.name.toLowerCase().includes(query);
      const brandMatch = product.brand.some((b) =>
        b.name.toLowerCase().includes(query)
      );

      return categoryMatch || productNameMatch || brandMatch;
    });

    // Apply category filter if a category is selected
    if (selectedCategory) {
      filtered = filtered.filter(
        (product) => product.category === selectedCategory
      );
    }

    setFilteredProducts(filtered);
    setSearchTerm(""); // Clear input after search
  };

  const navigate = useNavigate();
  const handleProductClick = (product) => {
    setSelectedProduct(product);
    navigate("/selectedProduct");
  };

  return (
    <>
      <div style={{ marginTop: "20px", display: "flex", flexWrap: "wrap" }}>
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div
              key={product.id}
              style={{
                border: "1px solid #ddd",
                borderRadius: "8px",
                maxWidth: "400px",
                maxHeight: "600px",
                margin: "15px",
              }}
            >
              {product.images.length > 0 ? (
                <img
                  src={product.images[0]} // Display first image only
                  alt={product.name}
                  style={{
                    width: "300px",
                    height: "300px",
                    objectFit: "cover",
                    borderRadius: "8px",
                  }}
                  onClick={() => handleProductClick(product)}
                />
              ) : (
                <p>No image available</p>
              )}
              <span className="text">
                <h5 className="name">
                  <span
                    style={{ color: "black" }}
                    dangerouslySetInnerHTML={{
                      __html: highlightText(product.name, searchTerm),
                    }}
                  ></span>{" "}
                </h5>
                <h5>Description: {product.desc}</h5>
                <h5>Price: {product.price}</h5>
                <div>
                  <button onClick={() => addToCart(product)}>addToCart</button>{" "}
                  <button onClick={() => addToWishList(product)}>
                    +wisList
                  </button>
                </div>
              </span>
            </div>
          ))
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </>
  );
}

export default Category;
