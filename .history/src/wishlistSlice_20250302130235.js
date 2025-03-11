import { createSlice } from "@reduxjs/toolkit";

const loadCartFromStorage =()=>{
    const storedCart = loadCartFromStorage.getItem("wishlist");
    return storedCart ? JSON.parse(storedCart) : []
}
const cartSlice = createSlice({
    name: "wishlist",
    initialState: {
        items: [],
    },
    reducers: {
        setWishList: (state, action) => {
            state.items = action.payload;
            localStorage.setItem("wishlist", JSON.stringify(state.items)); // Save to localStorage
        },
        addToWishList: (state, action) => {
            state.items.push(action.payload);
            localStorage.setItem("wishlist", JSON.stringify(state.items)); // Save to localStorage
        },
        removeFromWish: (state, action) => {
            state.items = state.items.filter(item => item.id !== action.payload);
            localStorage.setItem("wishlist", JSON.stringify(state.items));
        },
        clearCart: (state) => {
            state.items = [];
            // localStorage.removeItem("wishlist");
        }
    }
});

export const { setWishList, addToWishList, removeFromWish, clearCart } = cartSlice.actions;
export default cartSlice.reducer;