import { configureStore } from "@reduxjs/toolkit";
import analyticsReducer from "../features/analyticsSlice";

export const store = configureStore({
    reducer: {
        // products: productReducer,
        // categories: categoryReducer,
        // orders: orderReducer,
        analytics: analyticsReducer,
    },
});