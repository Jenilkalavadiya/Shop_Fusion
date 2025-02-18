import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemToCart(state, action) {
      state.cart.push(action.payload);
    },
    deleteItemToCart(state, action) {
      state.cart = state.cart.filter((item, index) => index !== action.payload);
    },
    totalsum(state, action) {
      state.cart = state.cart.reduce(
        (acc, item) => acc + item.price * item.quantity
      );
    },
  },
});

export const { addItemToCart, deleteItemToCart,totalsum } = cartSlice.actions;
