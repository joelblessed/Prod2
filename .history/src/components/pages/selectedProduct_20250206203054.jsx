import React from "react";

const SelectedProduct = ({ api, selectedProduct, addToCart }) => {
  return (
    <div>
      <h1>seleted Product</h1>
      {/* Display the selected selectedProduct details */}
      {selectedProduct && (
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
              {pro}
            </h5>
            <h5>Description: {product.desc}</h5>
            <h5>Price: {product.price}</h5>
            <div>
              <button onClick={() => addToCart(product)}>addToCart</button>{" "}
              <button onClick={() => addToWishList(product)} >+wisList</button>
            </div>
          </span>
        </div>
      )}
    </div>
  );
};

export default SelectedProduct;
