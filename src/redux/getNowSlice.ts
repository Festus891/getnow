import { createSlice } from "@reduxjs/toolkit";
import { ProductProps } from "../../type";
import { act } from "react";
import toast from "react-hot-toast";

interface StoreState {
  productData: ProductProps[];
}

const initialState: StoreState = {
  productData: [],
};

export const getNowSlice = createSlice({
  name: "getNow",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingProduct = state?.productData.find((item: ProductProps) => {
        item?._id === action?.payload?._id;
      });
      if (existingProduct) {
        existingProduct.quantity += action.payload.quantity;
      } else {
        state.productData.push(action.payload);
      }
    },
    increaseQuantity: (state, action) => {
      const existingProduct = state.productData.find(
        (item: ProductProps) => item._id === action.payload._id
      );
      existingProduct && existingProduct.quantity++;
    },
    decreaseQuantity: (state, action) => {
      const existingProduct = state.productData.find(
        (item: ProductProps) => item._id === action.payload._id
      );
      if (existingProduct?.quantity === 1) {
        existingProduct.quantity === 1;
      } else {
        existingProduct && existingProduct.quantity--;
      }
      // if (existingProduct) {
      //   if (existingProduct.quantity <= 1) {
      //     toast("You cannot decrease the quantity below 1");
      //   } else {
      //     existingProduct.quantity--;
      //   }
      // }
    },
    deleteProduct: (state, action) => {
      state.productData = state.productData.filter(
        (item) => item._id !== action.payload
      );
    },
    resetCart: (state) => {
      state.productData = [];
    },
  },
});

export const {
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  deleteProduct,
  resetCart,
} = getNowSlice.actions;
export default getNowSlice.reducer;
