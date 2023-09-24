import { createSlice } from "@reduxjs/toolkit";
export const modalCOpen = createSlice({
  name: "modalCOpen",
  initialState: {
    open: false,
  },
  reducers: {
    openModalState: (state, action) => {
      state.open = action.payload;
    },
  },
});

export const { openModalState } = modalCOpen.actions;
export default modalCOpen.reducer;
export const selectModalState = (state) => state.modalCOpen.open;
