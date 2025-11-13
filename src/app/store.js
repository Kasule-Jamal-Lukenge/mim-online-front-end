import { configureStore } from "@reduxjs/toolkit";
import analyticsSlice from "../features/analyticsSlice";

export const store = configureStore({
    reducer: {
        products: productReducer,
        categories: categoryReducer,
        orders: orderReducer,
        analytics: analyticsReducer,
    },
});