import { configureStore } from "@reduxjs/toolkit";
import { cartSlice } from "./cartSlice";
import { userSlice } from "./userSlice";
import { orderSlice } from "./orderSlice";

export const store = configureStore({
  reducer: {
    cartSlice: cartSlice.reducer,
    userSlice: userSlice.reducer,
    orderSlice: orderSlice.reducer,
  },
});
