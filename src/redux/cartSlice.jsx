import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: JSON.parse(localStorage.getItem("cartItem")) || [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemToCart(state, action) {
      const exisitingItem = state.cart.find(
        (item) => item.id === action.payload.id
      );
      if (exisitingItem) {
        exisitingItem.quantity += 1;
      } else {
        state.cart.push({ ...action.payload, quantity: 1 });
      }

      localStorage.setItem("cartItem", JSON.stringify(state.cart));
    },
    deleteItemToCart(state, action) {
      state.cart = state.cart.filter((item, index) => index !== action.payload);
      localStorage.setItem("cartItem", JSON.stringify(state.cart));
    },
    totalsum(state, action) {
      state.cart = state.cart.reduce(
        (acc, item) => acc + item.price * item.quantity
      );
    },
    increaseItemQuantity: (state, action) => {
      const item = state.cart.find((item) => item.id === action.payload);
      if (item) {
        item.quantity += 1;
      }
      localStorage.setItem("cartItem", JSON.stringify(state.cart));
    },
    decreaseItemQuantity: (state, action) => {
  const item = state.cart.find((item) => item.id === action.payload);
  if (item) {
    if (item.quantity === 1) {
      state.cart = state.cart.filter((item) => item.id !== action.payload);
    } else {
      // Otherwise, just decrease the quantity
      item.quantity--;
    }
  }
  localStorage.setItem("cartItem", JSON.stringify(state.cart)); // Update localStorage
},

    LOGOUT: (state, action) => {
      return (state = []);
    },
    clearCart: (state, action) => {
      state.cart = [];
      localStorage.removeItem("cartItem");
    },
  },
});

export const {
  addItemToCart,
  deleteItemToCart,
  totalsum,
  increaseItemQuantity,
  decreaseItemQuantity,
  clearCart,
} = cartSlice.actions;
