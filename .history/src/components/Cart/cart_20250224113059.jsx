import { useState, useEffect } from "react";

const Cart = ({ user }) => {
  const [cart, setCart] = useState([]);

  // Fetch user's cart from backend
  const fetchCartByUserId = async (userId) => {
    try {
      const response = await fetch(`http://localhost:3001/cart?userId=${userId});

      if (!response.ok) {
        if (response.status === 404) return []; // Handle empty cart case
        throw new Error("Failed to fetch cart");
      }

      const cartData = await response.json();
      return cartData.items || [];
    } catch (error) {
      console.error("Error fetching cart:", error);
      return [];
    }
  };

  // Update the cart in backend
  const updateCart = async (userId, updatedItems) => {
    try {
      await fetch(`http://localhost:3001/cart/${userId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: updatedItems }),
      });
    } catch (error) {
      console.error("Error updating cart:", error);
    }
  };

  // Fetch cart on user login
  useEffect(() => {
    if (user?.id) {
      fetchCartByUserId(user.id).then(setCart);
    }
  }, [user]);

  // Handle quantity increment and decrement
  const handleQuantityChange = (productId, change) => {
    const updatedCart = cart.map((item) => {
      if (item.id === productId) {
        const newQuantity = item.quantity + change;
        return newQuantity > 0 ? { ...item, quantity: newQuantity } : null;
      }
      return item;
    }).filter(Boolean); // Remove items with quantity 0

    setCart(updatedCart);
    updateCart(user.id, updatedCart);
  };

  // Remove item from cart
  const handleRemoveItem = (productId) => {
    const updatedCart = cart.filter((item) => item.id !== productId);
    setCart(updatedCart);
    updateCart(user.id, updatedCart);
  };

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      {cart.length > 0 ? (
        <ul>
          {cart.map((item) => (
            <li key={item.id}>
              <span>{item.name} - ${item.price}</span>
              <div>
                <button onClick={() => handleQuantityChange(item.id, -1)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => handleQuantityChange(item.id, 1)}>+</button>
                <button onClick={() => handleRemoveItem(item.id)}>Remove</button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>Your cart is empty.</p>
      )}
    </div>
  );
};

export default Cart;