// src/redux/categorySlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Category } from "../types";

interface CategoryState {
  categories: Category[];
  error: string | null;
  loading: boolean;
  lastFetched: number; // Timestamp to track when data was last fetched
}

const initialState: CategoryState = {
  categories: [],
  error: null,
  loading: false, // Start with loading as false to check cache first
  lastFetched: 0, // Initialize lastFetched to 0
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    fetchCategoriesStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchCategoriesSuccess: (state, action: PayloadAction<Category[]>) => {
      state.categories = action.payload;
      state.loading = false;
      state.error = null;
      state.lastFetched = Date.now(); // Update timestamp when data is fetched
    },
    fetchCategoriesFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  fetchCategoriesStart,
  fetchCategoriesSuccess,
  fetchCategoriesFailure,
} = categorySlice.actions;
export default categorySlice.reducer;
