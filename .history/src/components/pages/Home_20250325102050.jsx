import React, { createContext, useEffect, useState } from "react";


const Home = ({api,filteredProductsBySeller, ownersProducts}) => {
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
  return (
    const id
    <div>
      {ownersProducts.map((product,index) =>(
        <div key={index}>
          {product.name},
          {product.ownerId}
        </div>
      ))}
      
    </div>
  )
}

export default Home
