import { useState, useEffect } from "react";

const fetchCartByUserId = async (userId) => {
  try {
    const response = await fetch(http://localhost:3001/cart?userId=${userId});

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

const Cart = ({ user }) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    if (user?.id) {
      fetchCartByUserId(user.id).then(setCart);
    }
  }, [user]);

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
              <button onClick={() => handleRemoveItem(item.id)}>Remove</button>
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