import { createSlice } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = "http://localhost:8000/api/admin/products";

// Create an API slice for Admin Product
export const adminProductApi = createApi({
  reducerPath: "adminProductApi",
  baseQuery: fetchBaseQuery({
    baseUrl, // Set the base URL
    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  endpoints: (builder) => ({
    // Add Product
    addProduct: builder.mutation({
      query: (formData) => ({
        url: "/addproduct",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: [{ type: "Product", id: "LIST" }],
    }),

    // Fetch All Products
    fetchAllProducts: builder.query({
      query: () => ({
        url: "/getproduct",
        method: "GET",
      }),
      invalidatesTags: [{ type: "Product", id: "LIST" }],
    }),

    // Edit Product
    editProduct: builder.mutation({
      query: ({ id, updatedData }) => ({
        url: `/editproduct/${id}`,
        method: "PUT",
        body: updatedData,
      }),
    }),

    // Delete Product
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/deleteproduct/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

// Export hooks for usage in components
export const {
  useAddProductMutation,
  useFetchAllProductsQuery,
  useEditProductMutation,
  useDeleteProductMutation,
} = adminProductApi;


const initialState = {
    isLoading: false,
    productList: [],
  };
  
  const AdminProductsSlice = createSlice({
    name: "adminProducts",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        // Handle fetchAllProducts query
        .addMatcher(
          adminProductApi.endpoints.fetchAllProducts.matchPending,
          (state) => {
            state.isLoading = true;
          }
        )
        .addMatcher(
          adminProductApi.endpoints.fetchAllProducts.matchFulfilled,
          (state, action) => {
            state.isLoading = false;
            state.productList = action.payload?.data || [];
          }
        )
        .addMatcher(
          adminProductApi.endpoints.fetchAllProducts.matchRejected,
          (state) => {
            state.isLoading = false;
            state.productList = [];
          }
        );
    },
  });
  
  export default AdminProductsSlice.reducer;