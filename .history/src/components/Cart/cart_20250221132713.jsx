import React, { createContext, use, useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Cart = () => {
const [cartItems, setCart] = useState([])
const [isInCart,setIsInCart] = useState(false)
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);
  }, []);
    // Remove from cart function
    const handleRemoveFromCart = () => {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        const updatedCart = cart.filter((item) => item.id !== product.id);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        setIsInCart(false);
      };

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