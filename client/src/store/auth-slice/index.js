// import { createSlice } from "@reduxjs/toolkit";
// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// import { createSlice } from "@reduxjs/toolkit";

// const baseUrl="http://localhost:8000/api/auth";
// export const authApi = createApi({
//   reducerPath: "authApi",
//   baseQuery: fetchBaseQuery({
//     baseUrl:baseUrl ,
//     credentials: "include", // To include cookies with the request
//     prepareHeaders: (headers) => {
//       headers.set(
//         "Cache-Control",
//         "no-store, no-cache, must-revalidate, proxy-revalidate"
//       );
//       return headers;
//     },
//   }),
//   endpoints: (builder) => ({
//     registerUser: builder.mutation({
//       query: (formData) => ({
//         url: "/register",
//         method: "POST",
//         body: formData,
//       }),
//     }),
//     loginUser: builder.mutation({
//       query: (formData) => ({
//         url: "/login",
//         method: "POST",
//         body: formData,
//       }),
//     }),
//     checkAuth: builder.query({
//       query: () => ({
//         url: "/checkauth",
//         method: "GET",
//       }),
//     }),
//     logoutUser: builder.mutation({
//       query: () => ({
//         url: "/logout",
//         method: "GET",
//       }),
//     }),
//   }),
// });

// // Export hooks for components to use
// export const {
//   useRegisterUserMutation,
//   useLoginUserMutation,
//   useCheckAuthQuery,
//   useLogoutUserMutation,
// } = authApi;

// Initial state

// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   user: null,
//   isAuthenticated: false,
//   isLoading: true,
// };

// const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     setUser: (state, action) => {
//       state.user = action.payload;
//       state.isAuthenticated = !!action.payload; // Set `isAuthenticated` to true if user exists
//     },
//     logoutUser: (state) => {
//       state.user = null;
//       state.isAuthenticated = false; // Set `isAuthenticated` to false on logout
//     },
//     setLoading: (state, action) => {
//       state.isLoading = action.payload;
//     },
//   },
// });

// export const { setUser, logoutUser, setLoading } = authSlice.actions;
// export default authSlice.reducer;

// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import axios from "axios";

// const initialState = {
//   isAuthenticated: false,
//   isLoading: true,
//   user: null,
// };

// export const registerUser = createAsyncThunk(
//   "/auth/register",
//   async (formData, { rejectWithValue }) => {
//     try {
//       const response = await axios.post(
//         "http://localhost:8000/api/auth/register",
//         formData,
//         {
//           withCredentials: true,
//         }
//       );
//       return response.data;
//     } catch (error) {
//       // Use rejectWithValue to return a custom payload for the rejected action
//       if (error.response && error.response.data) {
//         return rejectWithValue(error.response.data); // Pass backend error message
//       }
//       return rejectWithValue({ message: "An unexpected error occurred" });
//     }
//   }
// );

// export const loginUser = createAsyncThunk(
//   "/auth/login",
//   async (formData, { rejectWithValue }) => {
//     try {
//       const response = await axios.post(
//         "http://localhost:8000/api/auth/login",
//         formData,
//         {
//           withCredentials: true,
//         }
//       );
//       return response.data;
//     } catch (error) {
//       // Use rejectWithValue to return a custom payload for the rejected action
//       if (error.response && error.response.data) {
//         return rejectWithValue(error.response.data); // Pass backend error message
//       }
//       return rejectWithValue({ message: "An unexpected error occurred" });
//     }
//   }
// );
// export const checkAuth = createAsyncThunk(
//   "/auth/checkauth",
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await axios.get(
//         "http://localhost:8000/api/auth/checkauth",
//         {
//           withCredentials: true,
//           headers: {
//             "Cache-Control":
//               "no-store, no-cache, must-revalidate , proxy-revalidate",
//           },
//         }
//       );
//       return response.data;
//     } catch (error) {
//       // Return custom error payload if available
//       if (error.response && error.response.data) {
//         return rejectWithValue(error.response.data);
//       }
//       // Return a fallback error message
//       return rejectWithValue({ message: "An unexpected error occurred" });
//     }
//   }
// );

// export const logoutUser= createAsyncThunk(
//   "/auth/logout",
//   async ()=>{
//     const response= await axios.get(
//       "http://localhost:8000/api/auth/logout",
//       {},
//       {
//         withCredentials:true
//       }
//     )
//     return response.data;
//   }
// )
// import { authApi } from "../authapi";

// const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     setUser: (state, action) => {},
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(registerUser.pending, (state) => {
//         state.isLoading = true;
//       })
//       .addCase(registerUser.fulfilled, (state) => {
//         state.isLoading = false;
//         state.user = null;
//         state.isAuthenticated = false;
//       })
//       .addCase(registerUser.rejected, (state, action) => {
//         state.isLoading = false;
//         state.user = null;
//         state.isAuthenticated = false;
//         console.error("Registration error:", action.error); // Log the error for debugging
//       })
//       .addCase(loginUser.pending, (state) => {
//         state.isLoading = true;
//       })
//       .addCase(loginUser.fulfilled, (state,action) => {
//         state.isLoading = false;
//         state.user = action.payload.success ? action.payload.user : null;
//         state.isAuthenticated = action.payload.success;
//       })
//       .addCase(loginUser.rejected, (state, action) => {
//         state.isLoading = false;
//         state.user = null;
//         state.isAuthenticated = false;
//         console.error("Login error:", action.error); // Log the error for debugging
//       })
//       .addCase(checkAuth.pending, (state) => {
//         state.isLoading = true;
//       })
//       .addCase(checkAuth.fulfilled, (state,action) => {
//         state.isLoading = false;
//         state.user = action.payload.success ? action.payload.user : null;
//         state.isAuthenticated = action.payload.success;
//       })
//       .addCase(checkAuth.rejected, (state, action) => {
//         state.isLoading = false;
//         state.user = null;
//         state.isAuthenticated = false;
//         console.error("Login error:", action.error); // Log the error for debugging
//       });
//   },
// });

// export const { setUser } = authSlice.actions;
// export default authSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import { authApi } from "../authapi"; // Correctly import authApi

const initialState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
};

// Slice for authentication state
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload; // Set isAuthenticated based on user presence
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle registerUser mutation
      .addMatcher(authApi.endpoints.registerUser.matchPending, (state) => {
        state.isLoading = true;
      })
      .addMatcher(authApi.endpoints.registerUser.matchFulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addMatcher(
        authApi.endpoints.registerUser.matchRejected,
        (state, action) => {
          state.isLoading = false;
          state.user = null;
          state.isAuthenticated = false;
          console.error("Registration error:", action.error);
        }
      )

      // Handle loginUser mutation
      .addMatcher(authApi.endpoints.loginUser.matchPending, (state) => {
        state.isLoading = true;
      })
      .addMatcher(
        authApi.endpoints.loginUser.matchFulfilled,
        (state, action) => {
          state.isLoading = false;
          state.user = action.payload.success ? action.payload.user : null;
          state.isAuthenticated = action.payload.success;
        }
      )
      .addMatcher(
        authApi.endpoints.loginUser.matchRejected,
        (state, action) => {
          state.isLoading = false;
          state.user = null;
          state.isAuthenticated = false;
          console.error("Login error:", action.error);
        }
      )

      // Handle checkAuth query
      .addMatcher(authApi.endpoints.checkAuth.matchPending, (state) => {
        state.isLoading = true;
      })
      .addMatcher(
        authApi.endpoints.checkAuth.matchFulfilled,
        (state, action) => {
          state.isLoading = false;
          state.user = action.payload.success ? action.payload.user : null;
          state.isAuthenticated = action.payload.success;
        }
      )
      .addMatcher(
        authApi.endpoints.checkAuth.matchRejected,
        (state, action) => {
          state.isLoading = false;
          state.user = null;
          state.isAuthenticated = false;
          console.error("Auth check error:", action.error);
        }
      )
      // Handle logoutUser mutation
      .addMatcher(authApi.endpoints.logoutUser.matchPending, (state) => {
        state.isLoading = true;
      })
      .addMatcher(authApi.endpoints.logoutUser.matchFulfilled, (state) => {
        state.isLoading = false;
        state.user = null; // Clear the user state on logout
        state.isAuthenticated = false; // Set isAuthenticated to false
      })
      .addMatcher(
        authApi.endpoints.logoutUser.matchRejected,
        (state, action) => {
          state.isLoading = false;
          console.error("Logout error:", action.error); // Log the error for debugging
        }
      );
  },
});

// Export actions for the slice
export const { setUser } = authSlice.actions;
export default authSlice.reducer;
