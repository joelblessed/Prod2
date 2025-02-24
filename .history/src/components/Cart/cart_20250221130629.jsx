import React from "react";
import { useSelector } from "react-redux";

const Cart = () => {
const [cart, setCart] 
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);
  }, []);

  return (
    <div>
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