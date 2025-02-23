import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MenuItem } from "../types";

interface ItemState {
  items: MenuItem[];
  error: string | null;
  loading: boolean;
  selectedItem: MenuItem | null;
}

const initialState: ItemState = {
  items: [],
  error: null,
  loading: true,
  selectedItem: null,
};

const itemSlice = createSlice({
  name: "item",
  initialState,
  reducers: {
    fetchItemsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchItemsSuccess: (state, action: PayloadAction<MenuItem[]>) => {
      state.items = action.payload;
      state.loading = false;
      state.error = null;
    },
    fetchItemsFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
    setSelectedItem: (state, action: PayloadAction<MenuItem | null>) => {
      state.selectedItem = action.payload;
    },
    clearSelectedItem: (state) => {
      state.selectedItem = null;
    },
  },
});

export const {
  fetchItemsStart,
  fetchItemsSuccess,
  fetchItemsFailure,
  setSelectedItem,
  clearSelectedItem,
} = itemSlice.actions;
export default itemSlice.reducer;
