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
      state.cart = state.cart.filter((item) => item.id !== action.payload);
    },
  },
});

export const { addItemToCart, deleteItemToCart } = cartSlice.actions;
