import { createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../service/axiosInstance";

import { Cookies } from "react-cookie";
import { toast } from "react-toastify";
const cookie = new Cookies();
const initialState = {
  isLoading: false,
  error: false,
};

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateRegisterEmail(state, actions) {
      state.isLoading = actions.payload.isLoading;
      state.error = actions.payload.error;
    },
    loginUser(state, actions) {
      state.isLoading = actions.payload.isLoading;
      state.error = actions.payload.error;
    },
  },
});

export default slice.reducer;

export function RegisterUser(FormData) {
  return async (disptach, state) => {
    disptach(
      slice.actions.updateRegisterEmail({ isLoading: true, error: false })
    );
    await axiosInstance
      .post("/auth/register", { ...FormData })
      .then((data) => {
        toast.success(data?.data?.message, {
          autoClose: 1000,
        });
        setTimeout(() => {
          window.location.href = "/login";
        }, 1200);
      })
      .catch((error) => {
        toast.error(error?.response?.data.message);
        disptach(
          slice.actions.updateRegisterEmail({
            error: true,
          })
        );
      })
      .finally(() => {
        slice.actions.updateRegisterEmail({
          isLoading: false,
        });
      });
  };
}

export function LoginUser(FormData) {
  return async (disptach) => {
    disptach(
      slice.actions.loginUser({
        isLoading: true,
      })
    );
    await axiosInstance
      .post("/auth/login", { ...FormData })
      .then((data) => {
        toast.success(data?.data?.message, {
          autoClose: 1000,
        });
        // expires: Date.now() + 30 + 60 * 1000,
        // expires: Date.now() + 30 * 60 * 1000,
        cookie.set("auth", data?.data?.token, {
          path: "/",
        });
        cookie.set("user_id", data?.data?.id, {
          path: "/",
        });
        setTimeout(() => {
          window.location.href = "/";
        }, 1500);
      })
      .catch((error) => {
        toast.error(error && error?.response?.data?.message, {
          autoClose: 3000,
        });
      })
      .finally(() => {
        disptach(
          slice.actions.loginUser({
            isLoading: false,
          })
        );
      });
  };
}
