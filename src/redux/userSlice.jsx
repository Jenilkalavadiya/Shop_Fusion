import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  login: JSON.parse(localStorage.getItem("loggedin")),
};

export const userSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    authentication(state, action) {
      const loggedIn = JSON.parse(localStorage.getItem("loggedin"));
      state.login = loggedIn;
    },
  },
});

export const { authentication } = userSlice.actions;

export default userSlice.reducer;
