import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  productList: [],
};

export const addProduct = createAsyncThunk(
  "product/addproduct",
  async (formData) => {
    const result = await axios.post(
      "http://localhost/8000/api/admin/products/addproduct",
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return result?.data;
  }
);

export const fetchAllProduct = createAsyncThunk("/admin/fetchAllProduct", async () => {
  const result = await axios.get(
    "http://localhost/8000/api/admin/products/getproduct"
  );
  return result?.data;
});

 export const editProduct = createAsyncThunk(
    "/admin/editProduct",
    
 )

const AdminProductSlice = createSlice({
  name: "adminProduct",
  initialState,
  reducers: {},
  extraReducers: (builder) => {},
});

export default AdminProductSlice;
