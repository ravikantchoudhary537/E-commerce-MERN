// store.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice"; // Import the auth slice reducer

import { authApi } from "./authapi";
import { adminProductApi } from "./auth-slice/productapi";
// import AdminProducts from "@/pages/admin-view/products";
import AdminProductsSlice from "@/store/auth-slice/productapi.js"

const store = configureStore({
  reducer: {
    auth: authReducer,
    adminProducts: AdminProductsSlice, // Corrected key name
    [authApi.reducerPath]: authApi.reducer,
    [adminProductApi.reducerPath]: adminProductApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(adminProductApi.middleware),
});

export default store;

