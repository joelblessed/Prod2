import React, { useState, useEffect } from "react";

const Cart = ({ userId }) => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch cart by userId
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await fetch(/cart?userId=${userId});
        if (!response.ok) {
          throw new Error("Failed to fetch cart");
        }
        const data = await response.json();
        setCart(data.items); // Assuming the response is { items: [...] }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [userId]); // Re-fetch when userId changes

  // Display loading state
  if (loading) {
    return <div>Loading cart...</div>;
  }

  // Display error state
  if (error) {
    return <div>Error: {error}</div>;
  }

  // Display cart items
  return (
    <div>
      <h2>Cart for User {userId}</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {cart.map((item) => (
            <li key={item.id}>
              {item.name} - ${item.price}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Cart;