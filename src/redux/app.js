import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  sideBar: {
    open: true,
    type: "CONTACT",
  },
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
      console.log({ state: state }, { action });
      state.sideBar.type = action.payload.type;
    },
  },
});

export default Slice.reducer;

function toggleSidebar() {
  return async (disptach) => {
    disptach(Slice.actions.toggleSidebar());
  };
}
export function updateSidebarTap(type) {
  return async (disptach) => {
    return disptach(Slice.actions.updateSidebarTap({ type }));
  };
}
export { toggleSidebar };
