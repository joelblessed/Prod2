import React, { createContext, use, useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Cart = () => {
const [product, setProducts] = useState(localStorage.getItem("cart"))
const [cartItems, setCart] = useState([])
const user = useSelector((state) => state.user); // Check if user is signed in
const [isInCart, setIsInCart] = useState(false);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);
  }, []);
 

  useEffect(() => {
    // Check if item is already in cart (for local storage)
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    setIsInCart(cart.some((item) => item.id === product.id));
  }, []);

  // Add to cart function
  const handleAddToCart = () => {
    if (user) {
      dispatch(addToCart(product)); // Add to Redux if signed in
    } else {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      cart.push(product);
      localStorage.setItem("cart", JSON.stringify(cart));
      setIsInCart(true);
    }
  };

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