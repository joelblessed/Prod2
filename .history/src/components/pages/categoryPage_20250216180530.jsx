import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

const CategoryPage = ({highlightText, a}) => {
  const { categoryName } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/products")
      .then((res) => res.json())
      .then((data) => {
        const filteredProducts = data.filter((product) => product.category === categoryName);
        setProducts(filteredProducts);
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, [categoryName]);

  return (
    <div style={styles.container}>
      <h1>{categoryName}</h1>
      <div   
        
        style={ styles.container }
      >
        {products.length > 0 ? (
          products.map((product, index) => (
            <div >
            
            <div className="animated-box"
              key={index}
              
              style={{
                ...styles.box,
               
                justifyContent:index === filteredProducts.length -1 ? "space-evenly" : {} // Apply style only to the last box
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
                    borderRadius: "10px",
                  }}
                  onClick={() => handleProductClick(product)}

                  // onClick={() =>
                  //   toggleSelection(
                  //     product.id,
                  //     product.isSelected,
                  //     navigate("/selectedProduct")
                  //   )
                  // }
                />
                
              ) : (
                <p>No image available</p>
              )}
              <span
                className="text"
                style={{
                  background:
                    " linear-gradient(45deg,white 33%, white 33%, #86a8e7 66%, #91eae4 66%)",
                    borderRadius:"10PX",
                  
                }}
              >
                <h5 className="name">
                  <span
                    style={{ color: "black" }}
                    dangerouslySetInnerHTML={{
                      __html: highlightText(product.name, searchTerm),
                    }}
                  ></span>{" "}
                </h5>
                <h5>Description: {product.desc}  
                </h5>
                <h5>
                  Price: {product.price}{" "}
                  <button  style={{
                      background: "transparent",
                      border: "1px solid orange",
                      color: "orange",
                      padding: "0px 20px",
                      borderRadius: "10px 10px 10px 10px ",
                      cursor: "pointer",
                      fontSize: "40px",
                      fontWeight:"bold",
                      transition: "all 0.3s ease",
                      marginLeft:"140px"
                      
                    }} onClick={() => addTowishList(product)}>+</button>
                </h5>
                <div style={{ background: "" }}>
                  <button
                    style={{
                      background: "white",
                      border: "1px solid RED",
                      color: "red",
                      padding: "10px 20px",
                      borderRadius: "0px 0px 10px 10px ",
                      cursor: "pointer",
                      fontSize: "100%",
                      transition: "all 0.3s ease",
                      width: "100%",
                    }}
                    onClick={() => addToCart(product)}
                    
                  >
                    addToCart
                  </button>
              
                </div>
              </span>
            </div>
            </div>
          ))
        ) : (
          <p>Loading...</p>
        )}
      </div>

      <Link to="/" style={styles.backButton}>Back</Link>
    </div>
  );
};

const styles = {
  container: { width: "80%", margin: "auto", textAlign: "center" },
  productsGrid: { display: "flex", flexWrap: "wrap", gap: "10px", justifyContent: "center" },
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
  backButton: {
    display: "inline-block",
    marginTop: "20px",
    padding: "8px 15px",
    backgroundColor: "red",
    color: "white",
    textDecoration: "none",
    borderRadius: "5px",
  },
};

export default CategoryPage;