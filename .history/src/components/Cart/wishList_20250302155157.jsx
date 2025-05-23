import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addToWishListBeforeLogin, loadWishListAfterLogin, removeFromWishListAPI, clearWishListOnLogout } from "../../wishlistAction";

const Wish = () => {
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.wishlist.items);
    const token = localStorage.getItem("token"); // Check if user is signed in

    // 1. Load cart from localStorage before login
    useEffect(() => {
        const storedWishList = JSON.parse(localStorage.getItem("WishList")) || [];
        if (!token && storedWishList.length > 0) {
            dispatch({ type: "wishlist/setWishList", payload: storedWishList }); // Manually dispatch to set cart state
        }
    }, [dispatch, token]);

    // 2. Load cart from server after login
    useEffect(() => {
        if (token) {
            dispatch(loadWishListAfterLogin()); // Merge local and server cart
        }
    }, [dispatch, token]);

    // Add to Wish (Before Login)
    const handleAddToCart = (product) => {
        dispatch(addToWishListBeforeLogin(product));
    };

    // Remove Item from Wish
    const handleRemoveFromCart = (productId) => {
        dispatch(removeFromWishListAPI(productId));
    };

    // Clear Wish on Logout
    const handleClearCart = () => {
        dispatch(clearWishListOnLogout());
    };

    return (
        <div>
            <h2>Shopping Wish</h2>
            {cart.length === 0 ? (
                <p>Your cart is empty</p>
            ) : (
                <ul>
                    {cart.map((item) => (
                        <li key={item.id}>
                            {item.name} - ${item.price}
                            <button onClick={() => handleRemoveFromCart(item.id)}>Remove</button>
                        </li>
                    ))}
                </ul>
            )}
            <button onClick={handleClearCart}>Clear Wish</button>
        </div>
    );
};

export default Wish;