import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItem, CartState } from "../types";

const initialState: CartState = {
  items: [],
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
        existingItem.selectedExtras = action.payload.selectedExtras;
        existingItem.selectedOptionalExtras =
          action.payload.selectedOptionalExtras || [];
        existingItem.selectedRequiredExtras =
          action.payload.selectedRequiredExtras || {};
      } else {
        state.items.push(action.payload);
      }
      state.totalPrice = state.items.reduce(
        (total, item) =>
          total +
          (item.price +
            (item.selectedOptionalExtras?.reduce(
              (sum, extra) => sum + extra.price,
              0
            ) || 0)) *
            item.quantity,
        0
      );
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      state.totalPrice = state.items.reduce(
        (total, item) =>
          total +
          (item.price +
            (item.selectedOptionalExtras?.reduce(
              (sum, extra) => sum + extra.price,
              0
            ) || 0)) *
            item.quantity,
        0
      );
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
