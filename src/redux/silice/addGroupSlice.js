const { createSlice } = require("@reduxjs/toolkit");
const initialState = {
  isOPen: false,
};
const addGroupSlice = createSlice({
  name: "addGroupSlice",
  initialState,
  reducers: {
    toogelGroupDialog: (state) => {
      return (state.isOPen = !state.isOPen);
    },
  },
});

export default addGroupSlice.reducer

export function ToogeddGroupSlice() {
  return async((disptach) => {
    disptach(addGroupSlice.actions.ToogeddGroupSlice());
  });
}
