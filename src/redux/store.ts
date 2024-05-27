import { configureStore } from "@reduxjs/toolkit";
import linksReducer from "./LinkSlice/linkSlice"

export const store = configureStore ({
    reducer: {
            links: linksReducer,
    }
});
