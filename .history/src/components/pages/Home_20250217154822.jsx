import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Category = ({ api, highlightText, searchTerm, setSearchTerm,getProducts }) => {
  const [products, setProducts] = useState(getProducts);
  const [filteredProducts, setFilteredProducts] = useState([]); // filtered list
// single input for filtering
  const [categories, setCategories] = useState([]); // Unique categories
  const [selectedCategory, setSelectedCategory] = useState("");
   // Fetch products from db.json when the component mounts
   useEffect(() => {
    fetch()
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



  const groupByCategory = (products) => {
    return products.reduce((acc, product) => {
      if (!acc[product.category]) acc[product.category] = [];
      acc[product.category].push(product);
      return acc;
    }, {});
  };

  const groupedProducts = groupByCategory(products);

  return (
    <div style={styles.container}>
      {Object.keys(groupedProducts).map((category, index) => (
        <div key={index} style={styles.categoryContainer}>
          <h2 style={styles.categoryTitle}>
            {" "}
            <span
              style={{ color: "black" }}
              dangerouslySetInnerHTML={{
                __html: highlightText(category, searchTerm),
              }}
            ></span>{" "}
          </h2>
          <div style={styles.productsGrid}>
            {groupedProducts[category].slice(0, 3).map((product) => (
              <div key={product.id} style={styles.productBox}>
                <img
                  src={product.images[0]}
                  alt={product.name}
                  style={styles.image}
                />
                <p> <span
              style={{ color: "black" }}
              dangerouslySetInnerHTML={{
                __html: highlightText(product.name, searchTerm),
              }}
            ></span>{" "}</p>
              </div>
            
            ))}
            <div>
            <Link to={`/category/${category}`} style={styles.viewMoreButton}>
            View More
          </Link>
            </div>
          </div>
         
        </div>
      ))}
    </div>
  );
};

const styles = {
  container: { width: "80%", margin: "auto" },
  categoryContainer: { marginBottom: "20px" },
  categoryTitle: { color: "teal" },
  productsGrid: { display: "flex", flexWrap: "wrap", gap: "10px" ,border:"5px solid red"},
  productBox: {
    width: "120px",
    height: "150px",
    backgroundColor: "lightgray",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "8px",
  },
  image: { width: "80px", height: "80px", objectFit: "cover" },
  viewMoreButton: {
    display: "inline-block",
    marginTop: "10px",
    padding: "8px 15px",
    backgroundColor: "teal",
    color: "white",
    textDecoration: "none",
    borderRadius: "5px",
  },
};

export default Category;
