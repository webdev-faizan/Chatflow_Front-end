import { createSlice } from "@reduxjs/toolkit";

export const contactUsSlice = createSlice({
  name: "contactUs",
  initialState: {
    isToggled: false,
  },
  reducers: {
    toggleContactUs: (state) => {
      state.isToggled = !state.isToggled;
    },
  },
});

export const { toggleContactUs } = contactUsSlice.actions;


export const contactUsReducer = contactUsSlice.reducer;
