import React, { useEffect,useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWishlist, removeFromWishlist } from "../../wishlistSlice";

const WishlistPage = ({filteredProducts}) => {
    const dispatch = useDispatch();
    const [wishlistProducts,setWishlistProducts] = useState([])
    const userId = localStorage.getItem("userId") || "guest"; // Check if user is logged in
    // const wishlist = useSelector((state) => state.wishlist.items);
    const wishlist = ["6","9"]


    useEffect(() => {
        // Filter products in the frontend
        const filtered = filteredProducts.filter((product) => wishlist.includes(product.id.toString()));
        setWishlistProducts(filtered);
    }, [filteredProducts]); // Runs when products are fetched


    return (
        <div>
            <h2>My Wishlist</h2>
            {wishlistProducts.length === 0 ? (
                <p>No products in wishlistProducts.</p>
            ) : (
                <ul>
                    {wishlistProducts.map((product,index) => (
                        <li key={index}>
                            {product
                            <button onClick={() => dispatch(removeFromWishlist({ productId, userId }))}>
                                Remove
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default WishlistPage;