import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isAuthenticated: false,
  isLoading: true,
  user: null,
};

export const registerUser = createAsyncThunk(
  "/auth/register",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/auth/register",
        formData,
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      // Use rejectWithValue to return a custom payload for the rejected action
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data); // Pass backend error message
      }
      return rejectWithValue({ message: "An unexpected error occurred" });
    }
  }
);

export const loginUser = createAsyncThunk(
  "/auth/login",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/auth/login",
        formData,
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      // Use rejectWithValue to return a custom payload for the rejected action
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data); // Pass backend error message
      }
      return rejectWithValue({ message: "An unexpected error occurred" });
    }
  }
);
export const checkAuth = createAsyncThunk(
  "/auth/checkauth",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/auth/checkauth",
        {
          withCredentials: true,
          headers: {
            "Cache-Control":
              "no-store, no-cache, must-revalidate , proxy-revalidate",
          },
        }
      );
      return response.data;
    } catch (error) {
      // Return custom error payload if available
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      }
      // Return a fallback error message
      return rejectWithValue({ message: "An unexpected error occurred" });
    }
  }
);

export const logoutUser= createAsyncThunk(
  "/auth/logout",
  async ()=>{
    const response= await axios.get(
      "http://localhost:5000/api/auth/logout",
      {},
      {
        withCredentials:true
      }
    )
    return response.data;
  }
)

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
        console.error("Registration error:", action.error); // Log the error for debugging
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state,action) => {
        state.isLoading = false;
        state.user = action.payload.success ? action.payload.user : null;
        state.isAuthenticated = action.payload.success;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
        console.error("Login error:", action.error); // Log the error for debugging
      })
      .addCase(checkAuth.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkAuth.fulfilled, (state,action) => {
        state.isLoading = false;
        state.user = action.payload.success ? action.payload.user : null;
        state.isAuthenticated = action.payload.success;
      })
      .addCase(checkAuth.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
        console.error("Login error:", action.error); // Log the error for debugging
      });
  },
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;
