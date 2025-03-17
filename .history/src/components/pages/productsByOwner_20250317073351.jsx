import React, { useState, useEffect } from "react";

const ProductByOwner = ({ api}) => {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const ownerId = localStorage.getItem("userId"); 

  useEffect(() => {
    // Fetch products from the backend
    fetch(`${api}/products?ownerId=${ownerId}`)
      .then((response) => response.json())
      .then((data) => {
        setFilteredProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, [ownerId]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
      <>
         <div className="animated-box" style={styles.container}>
           {filteredProducts.length > 0 ? (
             filteredProducts.map((product, index) => (
               
                 <div style={{ border:"1px solid red", borderRadius:"12px", boxShadow:"0px 0px 10px 1px red"}}>
                   <div
                     key={index}
                     style={{
                       ...styles.box,
   
                       justifyContent:
                         index === filteredProducts.length - 1
                           ? "space-evenly"
                           : {}, // Apply style only to the last box
                     }}
                   >
                     {product.images.length > 0 ? (
                       <img
                         src={product.images[0]} // Display first image only
                         alt={product.name}
                         style={{
                           width: "250px",
                           height: "250px",
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
                   </div>
      
                 {/* text */}
                   <div style={{ display: "flex" }}>
                     <div
                       className="text"
                       style={{
                         background:
                           " linear-gradient(45deg,white 66%,pink)",
                         borderRadius: "10PX",
                         width: "215px",
                         height: "100px",
                         paddingLeft:"10px"
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
                       <h6>Description: {product.description}</h6>
                       <h6>Price: {product.price} </h6>
                     </div>
   
                     {/* like and wishlist */}
                     <div style={{background:"white", height:"100px"}}>
                       <div>
                         <button style={{background:"none", border:"0px"}}>
                           <svg
                             xmlns="http://www.w3.org/2000/svg"
                             height="24px"
                             viewBox="0 -960 960 960"
                             width="24px"
                             fill="red"
                           >
                             <path d="m480-120-58-52q-101-91-167-157T150-447.5Q111-500 95.5-544T80-634q0-94 63-157t157-63q52 0 99 22t81 62q34-40 81-62t99-22q94 0 157 63t63 157q0 46-15.5 90T810-447.5Q771-395 705-329T538-172l-58 52Zm0-108q96-86 158-147.5t98-107q36-45.5 50-81t14-70.5q0-60-40-100t-100-40q-47 0-87 26.5T518-680h-76q-15-41-55-67.5T300-774q-60 0-100 40t-40 100q0 35 14 70.5t50 81q36 45.5 98 107T480-228Zm0-273Z" />
                           </svg>
                         </button>
                       </div>
                       <div>
                         <button
                           style={{
                             background: "transparent",
                             border: "0px solid orange",
                             color: "orange",
                             padding: "0px 0px",
                             background: "none",
                             borderRadius: "10px 10px 10px 10px ",
                             cursor: "pointer",
                             fontSize: "40px",
                             transition: "all 0.3s ease",
                             marginRight: "auto",
                             width:"35px"
                           }}
                           onClick={() => dispatch(addToCartBeforeLogin(product))}
                         >
                           +
                         </button>
                       </div>
                     </div>
                   </div>
   
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
                       // onClick={() => addToCart(product)}
                       onClick={() => dispatch(addToCartAPI(product))}
                     >
                       addToCart
                     </button>
                   </div>
                 </div>
               
             ))
           ) : (
             <p>Loading...</p>
           )}
         </div>
   
         {/* {product.isSelected ? "Unselect" : "Select"} */}
       </>
  );
};

export default ProductByOwner;
 