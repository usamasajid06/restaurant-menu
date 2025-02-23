import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MenuItem } from "../types";

interface ItemState {
  items: MenuItem[];
  error: string | null;
  loading: boolean;
  selectedItem: MenuItem | null;
  lastFetchedByCategory: { [key: number]: number }; // Map categoryId to timestamp
}

const initialState: ItemState = {
  items: [],
  error: null,
  loading: false,
  selectedItem: null,
  lastFetchedByCategory: {},
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

      state.lastFetchedByCategory = {
        ...state.lastFetchedByCategory,
        [0]: Date.now(),
      };
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
    updateLastFetched: (state, action: PayloadAction<number>) => {
      state.lastFetchedByCategory = {
        ...state.lastFetchedByCategory,
        [action.payload]: Date.now(),
      };
    },
  },
});

export const {
  fetchItemsStart,
  fetchItemsSuccess,
  fetchItemsFailure,
  setSelectedItem,
  clearSelectedItem,
  updateLastFetched,
} = itemSlice.actions;
export default itemSlice.reducer;
