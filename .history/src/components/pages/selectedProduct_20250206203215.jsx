import React from "react";

const SelectedProduct = ({ api, selectedProduct, addToCart }) => {
  return (
    <div>
      <h1>seleted Product</h1>
      {/* Display the selected selectedProduct details */}
      {selectedProduct && (
          <div
          key={se.id}
          style={{
            border: "1px solid #ddd",
            borderRadius: "8px",
            maxWidth: "400px",
            maxHeight: "600px",
            margin: "15px",
             
           
          }}
         
        >
          {se.images.length > 0 ? (
            <img
              src={se.images[0]} // Display first image only
              alt={se.name}
              style={{
                width: "300px",
                height: "300px",
                objectFit: "cover",
                borderRadius: "8px",
              }}
            
            />
          ) : (
            <p>No image available</p>
          )}
          <span className="text">
            <h5 className="name">
              {se.name}
            </h5>
            <h5>Description: {se.desc}</h5>
            <h5>Price: {se.price}</h5>
            <div>
              <button onClick={() => addToCart(se)}>addToCart</button>{" "}
              <button onClick={() => addToWishList(se)} >+wisList</button>
            </div>
          </span>
        </div>
      )}
    </div>
  );
};

export default SelectedProduct;
