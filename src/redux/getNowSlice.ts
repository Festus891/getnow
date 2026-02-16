import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProductProps } from "../../type";

interface StoreState {
  productData: ProductProps[];
  wishlistData: ProductProps[];
}

const initialState: StoreState = {
  productData: [],
  wishlistData: [],
};

export const getNowSlice = createSlice({
  name: "getNow",
  initialState,
  reducers: {
    // ---------------- CART ----------------
    addToCart: (state, action: PayloadAction<ProductProps>) => {
      const incoming = action.payload;

      const existing = state.productData.find(
        (item) => item._id === incoming._id,
      );

      if (existing) {
        existing.quantity += incoming.quantity ?? 1;
      } else {
        state.productData.push({
          ...incoming,
          quantity: incoming.quantity ?? 1,
        });
      }
    },

    increaseQuantity: (state, action: PayloadAction<{ _id: string }>) => {
      const existing = state.productData.find(
        (item) => item._id === action.payload._id,
      );
      if (existing) existing.quantity++;
    },

    decreaseQuantity: (state, action: PayloadAction<{ _id: string }>) => {
      const existing = state.productData.find(
        (item) => item._id === action.payload._id,
      );
      if (!existing) return;
      if (existing.quantity > 1) existing.quantity--;
    },

    deleteProduct: (state, action: PayloadAction<string>) => {
      state.productData = state.productData.filter(
        (item) => item._id !== action.payload,
      );
    },

    resetCart: (state) => {
      state.productData = [];
    },

    // ---------------- WISHLIST ----------------
    addToWishlist: (state, action: PayloadAction<ProductProps>) => {
      const incoming = action.payload;
      const exists = state.wishlistData.some(
        (item) => item._id === incoming._id,
      );
      if (!exists) state.wishlistData.push(incoming);
    },

    removeFromWishlist: (state, action: PayloadAction<string>) => {
      state.wishlistData = state.wishlistData.filter(
        (item) => item._id !== action.payload,
      );
    },

    toggleWishlist: (state, action: PayloadAction<ProductProps>) => {
      const incoming = action.payload;
      const exists = state.wishlistData.some(
        (item) => item._id === incoming._id,
      );

      if (exists) {
        state.wishlistData = state.wishlistData.filter(
          (item) => item._id !== incoming._id,
        );
      } else {
        state.wishlistData.push(incoming);
      }
    },

    resetWishlist: (state) => {
      state.wishlistData = [];
    },
  },
});

export const {
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  deleteProduct,
  resetCart,
  addToWishlist,
  removeFromWishlist,
  toggleWishlist,
  resetWishlist,
} = getNowSlice.actions;

export default getNowSlice.reducer;
