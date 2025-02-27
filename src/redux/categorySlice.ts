import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Category } from "../types";

interface CategoryState {
  categories: Category[];
  error: string | null;
  loading: boolean;
  lastFetched: number;
}

const initialState: CategoryState = {
  categories: [],
  error: null,
  loading: false,
  lastFetched: 0,
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
      state.lastFetched = Date.now();
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
