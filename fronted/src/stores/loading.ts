import { createSlice } from "@reduxjs/toolkit";

const loadingSlice = createSlice({
  name: "loading",
  initialState: {
    count: 0,
  },
  reducers: {
    increaseLoading: (state) => {
      state.count += 1;
    },
    decreaseLoading: (state) => {
      state.count = Math.max(0, state.count - 1);
    },
    resetLoading: (state) => {
      state.count = 0;
    },
  },
});

export const { increaseLoading, decreaseLoading, resetLoading } =
  loadingSlice.actions;

export default loadingSlice.reducer;
