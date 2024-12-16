"use client";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface sidebarState {
  isSidebarOpen: boolean;
}

const initialState: sidebarState = {
  isSidebarOpen: false,
};

export const sidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    setIsSiderbarOpen: (state, action: PayloadAction<boolean>) => {
      state.isSidebarOpen = action.payload;
    },
  },
});

export const { setIsSiderbarOpen } = sidebarSlice.actions;

export default sidebarSlice.reducer;
