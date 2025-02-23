import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import categoryReducer from "./categorySlice";
import itemReducer from "./itemSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    category: categoryReducer,
    item: itemReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

import { useDispatch, useSelector } from "react-redux";

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector = <T>(selector: (state: RootState) => T) =>
  useSelector(selector);
