import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: localStorage.getItem("token"),
  userData: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      //user is authenticated
    },
    user: (state, action) => {
      state.userData += action.payload;
    },
  },
});

export const { login } = authSlice.actions;
export default authSlice.reducer;
