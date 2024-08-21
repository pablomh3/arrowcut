// redux/store.ts

import { configureStore } from "@reduxjs/toolkit";
import linksReducer from "./LinkSlice/linkSlice";

// Define RootState como el tipo que representa el estado completo de tu aplicación Redux
export type RootState = ReturnType<typeof store.getState>;

export const store = configureStore({
  reducer: {
    links: linksReducer,
  },
});
