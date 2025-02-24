import { createSlice } from "@reduxjs/toolkit";

// Initial state for orders
const initialState = {
  orders: [],
  currentOrder: null, 
};

// Create the slice for orders
export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setCurrentOrder: (state, action) => {
      state.currentOrder = action.payload;
    },
    addOrder: (state, action) => {
      state.orders.push(action.payload);
    },
    updateOrder: (state, action) => {
      const index = state.orders.findIndex(
        (order) => order.id === action.payload.id
      );
      if (index !== -1) {
        state.orders[index] = action.payload;
      }
    },
    clearCurrentOrder: (state) => {
      state.currentOrder = null;
    },
  },
});

// Export actions
export const { setCurrentOrder, addOrder, updateOrder, clearCurrentOrder } =
  orderSlice.actions;

// Export the reducer to be used in store
export default orderSlice.reducer;
