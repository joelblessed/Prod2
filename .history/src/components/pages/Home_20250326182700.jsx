import React, { createContext, useEffect, useState } from "react";


const Home = ({api,brands,filteredProducts, ownersProducts}) => {
  // const [products, setProducts] = useState([])
  // const owner = 9
  // useEffect(() => {
  //   fetch(`${api}/products`)
  //     .then((res) => res.json())
  //     .then((data) => {
  //       const filteredProducts = data.filter((product) => product.ownerId === owner);
  //       setProducts(filteredProducts);
  //     })
  //     .catch((error) => console.error("Error fetching products:", error));
  // }, [owner]);
  const id = localStorage.getItem("userId");
  return (
  
    <div>
      
     {brands.map((brand, index)=>(
      <label  key={index}>{brand}</label>
     ))}
     
    </div>
  )
}

export default Home
