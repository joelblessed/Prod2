import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

// Styled components
const CheckoutContainer = styled.div`
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  text-align: center;
  font-size: 2rem;
  color: #333;
`;

const CartList = styled.ul`
  list-style: none;
  padding: 0;
  margin-bottom: 20px;
`;

const CartItem = styled.li`
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid #eee;
`;

const CartDetails = styled.div`
  font-size: 1rem;
`;

const TotalAmount = styled.h3`
  font-size: 1.5rem;
  color: #333;
  margin-top: 10px;
`;

const SelectBox = styled.select`
  padding: 10px;
  margin: 10px 0;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 100%;
`;

const Button = styled.button`
  padding: 12px 20px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1.2rem;
  cursor: pointer;
  width: 100%;
  margin-top: 20px;

  &:disabled {
    background-color: #dcdcdc;
    cursor: not-allowed;
  }

  &:hover {
    background-color: #45a049;
  }
`;

const Message = styled.p`
  text-align: center;
  color: ${props => (props.success ? 'green' : 'red')};
  font-size: 1.2rem;
  margin-top: 20px;
`;

const Checkout = ({ api, setCalculateTotal, setCheckOut, paymentStatus, paymentNumber, paymentId }) => {
  const cart = useSelector((state) => state.cart.items);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [shippingLocation, setShippingLocation] = useState('local'); // 'local', 'national', 'international'
  const [shippingMethod, setShippingMethod] = useState('standard'); // 'standard', 'express'
  const navigate = useNavigate();

  // Calculate total price of items in the cart
  const calculateTotalAmount = () => {
    return cart.reduce((total, item) => total + item.quantity * item.price, 0);
  };

  // Calculate the shipping fee
  const calculateShippingFee = () => {
    const totalAmount = calculateTotalAmount();
    const totalWeight = cart.reduce((total, item) => total + item.weight * item.quantity, 0);

    if (totalAmount >= 50) {
      return 0; // Free shipping if total is over $50
    }

    if (shippingLocation === 'local') {
      return shippingMethod === 'standard' ? totalWeight * 2 : totalWeight * 3; // Different costs for standard/express
    }

    if (shippingLocation === 'national') {
      return shippingMethod === 'standard' ? totalWeight * 4 : totalWeight * 5; // Different costs for standard/express
    }

    if (shippingLocation === 'international') {
      return shippingMethod === 'standard' ? totalWeight * 6 : totalWeight * 7; // Different costs for standard/express
    }

    return 10; // Default shipping fee
  };

  // Calculate the total price with shipping fee
  const calculateTotalWithShipping = () => {
    return calculateTotalAmount() + calculateShippingFee();
  };

  // Handle checkout process
  const handleCheckout = async () => {
    setLoading(true);
    try {
      let username = sessionStorage.getItem("username");
      const [userInfo, setUserInfo] = useState({
        username,
        paymentNumber: paymentNumber,
        paymentStatus: paymentStatus,
        paymentId: paymentId,
      });

      const currentDate = new Date();
      const formattedDate = currentDate.toLocaleString();

      const orderData = {
        user: userInfo,
        date: formattedDate,
        totalAmount: calculateTotalWithShipping(),
        cart: cart,
      };

      // Simulate sending cart data to an API (replace with real checkout logic)
      await fetch(`${api}/order`s`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderData }),
      });

      // Clear cart from the database (assuming all items are checked out)
      for (const item of cart) {
        await fetch(${api}/cart/${item.id}, {
          method: 'DELETE',
        });
      }

      // Clear local state and show success message
      setSuccessMessage('Order placed successfully!');
    } catch (error) {
      console.error('Error during checkout:', error);
      setSuccessMessage('Checkout failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <CheckoutContainer>
      <Title>Checkout</Title>
      {cart.length === 0 ? <p>Your cart is empty.</p> : (
        <CartList>
          {cart.map((item) => (
            <CartItem key={item.id}>
              <CartDetails>{item.name} - Quantity: {item.quantity} - Price: ${item.price} - Weight: {item.weight}kg</CartDetails>
            </CartItem>
          ))}
        </CartList>
      )}

      <TotalAmount>Total Amount: ${calculateTotalAmount()}</TotalAmount>

      <div>
        <label>Shipping Location:</label>
        <SelectBox onChange={(e) => setShippingLocation(e.target.value)} value={shippingLocation}>
          <option value="local">Local</option>
          <option value="national">National</option>
          <option value="international">International</option>
        </SelectBox>
      </div>

      <div>
        <label>Shipping Method:</label>
        <SelectBox onChange={(e) => setShippingMethod(e.target.value)} value={shippingMethod}>
          <option value="standard">Standard</option>
          <option value="express">Express</option>
        </SelectBox>
      </div>

      <TotalAmount>Shipping Fee: ${calculateShippingFee()}</TotalAmount>
      <TotalAmount>Total with Shipping: ${calculateTotalWithShipping()}</TotalAmount>

      <Button onClick={handleCheckout} disabled={loading || cart.length === 0}>
        {loading ? 'Processing...' : 'Checkout'}
      </Button>

      {successMessage && <Message success={successMessage === 'Order placed successfully!'}>{successMessage}</Message>}
    </CheckoutContainer>
  );
};

export default Checkout;