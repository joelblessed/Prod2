import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loadCartAfterLogin, removeFromCartAPI } from "../../cartAction";

const Cart = ({count}) => {
    const dispatch = useDispatch();
    const userId = localStorage.getItem("userid")
    const cartItems = useSelector(state => state.cart.items);
    const cartCount= cartItems.length
   

    useEffect(() => {
        if (userId) {
            dispatch(loadCartAfterLogin(userId));
        }
    }, [userId, dispatch]);

    return (
        <div style={{marginTop:"90px"}}>
            <h2>Shopping Cart</h2>
            {count}
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