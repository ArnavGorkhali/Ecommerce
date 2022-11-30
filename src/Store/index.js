import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./Products";
import cartReducer from './Products/CartSlice'

export const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer
  }
});
