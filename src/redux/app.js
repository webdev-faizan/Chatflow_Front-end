import { createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../service/axiosInstance";
import { RedoOutlined } from "@mui/icons-material";
import axios from "axios";
const initialState = {
  sideBar: {
    open: true,
    type: "CONTACT",
  },
  snackbar: {
    open: false,
    message: "",
  },
  alluser: [],
  friends: [],
  requestToConnected: [],
};

export const Slice = createSlice({
  name: "app",
  initialState,

  reducers: {
    toggleSidebar: (state) => {
      state.sideBar.open = !state.sideBar.open;
    },
    updateSidebarTap: (state, action) => {
      window.scrollTo(0, 0);
      state.sideBar.type = action.payload.type;
    },
    showShackbar: (state, action) => {
      state.snackbar.open = action.payload.open;
      state.snackbar.message = action.payload.message;
    },

    //all user who have register in our app
    allUser: (state, action) => {
      // console.log(action.payload)
      state.alluser = action.payload.allUsers;
    },
    friends: (state, action) => {
      state.friends = action.payload.friends;
    },
    requestToConnected: (state, action) => {
      console.log(action.payload)
      state.requestToConnected = action.payload.requestToConnected;
    },
  },
});

export default Slice.reducer;

export function toggleSidebar() {
  return async (disptach) => {
    disptach(Slice.actions.toggleSidebar());
  };
}
export function updateSidebarTap(type) {
  return async (disptach) => {
    return disptach(Slice.actions.updateSidebarTap({ type }));
  };
}

export function showSnackBar(snackbarShowInfo) {
  return async (disptach) => {
    disptach(
      Slice.actions.showShackbar({
        open: snackbarShowInfo.open,
        message: snackbarShowInfo.message,
      })
    );
    setTimeout(() => {
      disptach(Slice.actions.showShackbar({ open: false, message: "" }));
    }, 5000);
  };
}
export function FetchAllUsers() {
  return async (disptach, state) => {
    try {
      await axiosInstance
        .get("/user/unconnectedusers", {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((resp) => {
          return disptach(Slice.actions.allUser({ allUsers: resp.data.data }));
        });
    } catch (error) {
      console.log(error);
    }
  };
}
export function FetchFriends() {
  return async (disptach) => {
    try {
      const { data } = await axiosInstance.get("user/connectedusers", {
        headers: {
          "Content-Type": "application/json",
        },
      });
      disptach(Slice.actions.friends({ friends: data.data }));
    } catch (error) {
      console.log(error);
    }
  };
}

export function FetchRequestToConnectedFriends() {
  return async (disptach) => {
    try {
      const { data } = await axiosInstance.get("/user/requestconnectedusers");
      console.log(data);
      disptach(
        Slice.actions.requestToConnected({ requestToConnected: data.data })
      );
    } catch (error) {
      console.log(error);
    }
  };
}
