import { createSlice } from "@reduxjs/toolkit";

const targetSlice = createSlice({
  name: "target",
  initialState: {
    target: null,
  },
  reducers: {
    setTarget: (state, action) => {
      state.target = action.payload;
    },
  },
});

export const { setTarget } = targetSlice.actions;
export default targetSlice.reducer;
