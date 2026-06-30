import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice";
import todoReducer from "../features/todoSlice"
export const Store = configureStore({
    reducer: {
        auth: authReducer,
         todo: todoReducer,
    },
});