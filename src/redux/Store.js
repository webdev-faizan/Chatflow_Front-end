import { configureStore } from "@reduxjs/toolkit";
import { contactUsReducer } from "./silice/contactusToogle";
export const store = configureStore({
  reducer: { contactUsReducer },
});
