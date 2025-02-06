import React from "react";

const SelectedProduct = ({ api, selectedProduct, addToCart }) => {
  return (
    <div>
      <h1>seleted Product</h1>
      {/* Display the selected selectedProduct details */}
      {selectedProduct && (
        <div
          style={{
            width: "100%",
            border: "0px solid",
          }}
        >
          <div
            key={selectedProduct.id}
            style={{ width: "auto", height: "400px", marginTop: "-10px" }}
            className="box2"
          >
            <div style={{ display: "flex" }}>
              <div style={{ display: "grid", marginRight: "10px" }}>
                <img
                  className="image"
                  style={{ width: "250px", height: "auto" }}
                  src={`${api}/images/` + selectedProduct.image}
                  alt={selectedProduct.name}
                />
              </div>

              <div style={{ display: "grid", width: "100%" }}>
                <label
                  style={{
                    background: "yellow",
                    height: "25px",
                    marginTop: "80px",
                  }}
                >
                  Description:{" "}
                </label>
                <p
                  style={{
                    background: "red",
                    height: "100px",
                    marginTop: "-95px",
                    overflow: "auto",
                  }}
                >
                  {selectedProduct.desc} 
                </p>
                <span
                  className="text"
                  style={{
                    background: "green",
                    height: "72px",
                    width: "200px",
                    marginTop: "",
                  }}
                >
                  <a
                    className="name"
                    style={{
                      background: "",
                      width: "auto",
                      height: "",
                      color: "black",
                      fontSize: "15px",
                    }}
                  >
                    {selectedProduct.name}
                  </a>
                  <a
                    style={{
                      background: "",
                      marginTop: "px",
                      fontSize: "14px",
                    }}
                  >
                    Price:<a>cfa {selectedProduct.price}</a>
                  </a>
                  <div
                    style={{
                      background: "",
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <button
                      className="btn btn-warning"
                      onClick={() => addToCart(selectedProduct)}
                    >
                      Add to Cart
                    </button>
                  </div>
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SelectedProduct;
