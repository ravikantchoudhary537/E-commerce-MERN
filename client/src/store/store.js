// store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth-slice'; // Import the auth slice reducer
import { authApi } from './authapi';

const store = configureStore({
  reducer: {
    auth: authReducer, // The slice reducer for authentication state
    [authApi.reducerPath]: authApi.reducer, // RTK Query API reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware), // Include RTK Query middleware
});

export default store;
