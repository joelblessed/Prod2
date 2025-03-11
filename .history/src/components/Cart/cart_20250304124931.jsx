import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addToCartBeforeLogin, loadCartAfterLogin, removeFromCartAPI, clearCartOnLogout } from "../../cartAction";
import { useNavigate, Link } from "react-router-dom";
import "./Cart.css"; // Import a separate CSS file for styles

const Cart = ({ api, highlightText, searchTerm }) => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.items);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    if (!token && storedCart.length > 0) {
      dispatch({ type: "cart/setCart", payload: storedCart });
    }
  }, [dispatch, token]);

  useEffect(() => {
    if (token) {
      dispatch(loadCartAfterLogin());
    }
  }, [dispatch, token]);

  const deleteItem = async (itemId) => {
    try {
      await fetch(`${api}/cart/${itemId}`, { method: "DELETE" });
      dispatch(removeFromCartAPI(itemId));
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const updateQuantity = async (itemId, currentQuantity, action) => {
    if (action === "decrement" && currentQuantity <= 1) return;

    const endpoint = action === "increment" ? "increment" : "decrement";
    try {
      await fetch(`${api}/cart/${itemId}/${endpoint}, { method: "PUT" });
      dispatch({ type: "cart/updateQuantity", payload: { itemId, action } });
    } catch (error) {
      console.error(Error updating quantity: ${error});
    }
  };

  return (
    <div className="cart-container">
      {cart.length === 0 ? (
        <h1 className="empty-cart">No items in the cart</h1>
      ) : (
        <div className="cart-items">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <>
              {cart.map((product) => (
                <div className="cart-item" key={product.id}>
                  <img src={product.images?.[0] || "no-image.jpg"} alt={product.name} className="cart-item-img" />
                  <div className="cart-item-details">
                    <h3 className="cart-item-name" dangerouslySetInnerHTML={{ __html: highlightText(product.name, searchTerm) }} />
                    <p className="cart-item-price">Price: <strong>cfa {product.price}</strong></p>
                    <p className="cart-item-desc">{product.desc}</p>

                    <div className="cart-item-actions">
                      <button onClick={() => updateQuantity(product.id, product.quantity, "decrement")}>-</button>
                      <span className="cart-item-quantity">{product.quantity}</span>
                      <button onClick={() => updateQuantity(product.id, product.quantity, "increment")}>+</button>
                      <button className="cart-item-delete" onClick={() => deleteItem(product.id)}>X</button>
                    </div>
                  </div>
                </div>
              ))}
              <div className="cart-checkout">
                <Link to={"/checkout"} className="btn-checkout">Checkout</Link>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Cart;