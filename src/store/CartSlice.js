import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
  },
  reducers: {
    addToCart: (state, action) => {
      const { dish, quantity, selectedVariation } = action.payload;

      const existingItemIndex = state.cartItems.findIndex(
        (item) =>
          item.dish.id === dish.id &&
          item.selectedVariation === selectedVariation
      );

      if (existingItemIndex >= 0) {
        state.cartItems[existingItemIndex].quantity += quantity;
      } else {
        state.cartItems.push({ dish, quantity, selectedVariation });
      }

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    removeCartItem: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.dish.id !== action.payload
      );
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
  },
});

export const { addToCart, removeCartItem } = cartSlice.actions;
export default cartSlice.reducer;
