import React, { createContext, use, useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Cart = () => {
const [cartItems, setCart] = useState([])
const [isInCart,setIsInCart] = useState(false)
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);
  }, []);

  return (
    <div style={{marginTop:" 90px"}}>
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? <p>Cart is empty</p> : 
        cartItems.map((item) => (
          <div key={item.id}>
            <h4>{item.name}</h4>
            <p>Price: ${item.price}</p>
          </div>
        ))
      }
    </div>
  );
};

export default Cart