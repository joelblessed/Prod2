import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loadCartAfterLogin, removeFromCartAPI } from "../../cartAction";

const Cart = () => {
    const dispatch = useDispatch();
    const userId = localStorage.getItem("userid")
    const cartItems = useSelector(state => state.cart.items);
    c

    useEffect(() => {
        if (userId) {
            dispatch(loadCartAfterLogin(userId));
        }
    }, [userId, dispatch]);

    return (
        <div>
            <h2>Shopping Cart</h2>
            {cartItems.length > 0 ? (
                cartItems.map((item) => (
                    <div key={item.id}>
                        <h4>{item.name}</h4>
                        <p>Price: ${item.price}</p>
                        <button onClick={() => dispatch(removeFromCartAPI(item.id, userId))}>
                            Remove
                        </button>
                    </div>
                ))
            ) : (
                <p>Your cart is empty</p>
            )}
        </div>
    );
};

export default Cart;