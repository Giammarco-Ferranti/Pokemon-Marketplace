import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slicers/auth.js";

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});
