// productsSlice.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk to fetch products
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const response = await axios.get(
      "https://ecommerce-app-backend-red.vercel.app/api/products",
    );
    return response.data;
  },
);

const productsSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    filteredProducts: [],
    filters: {
      rating: null,
      price: null,
      categories: [],
    },
    status: "idle",
    error: null,
  },
  reducers: {
    setFilters: (state, action) => {
      state.filters = action.payload;
      state.filteredProducts = state.products.filter((product) => {
        const { rating, categories } = state.filters;
        const ratingMatch = !rating || product.rating >= rating;
        const categoryMatch =
          categories.length === 0 || categories.includes(product.category);
        return ratingMatch && categoryMatch;
      });
    },
    clearFilters: (state) => {
      state.filters = {
        rating: null,
        price: null,
        categories: [],
      };
      state.filteredProducts = state.products;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload;
        state.filteredProducts = action.payload; // Initialize filteredProducts
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { setFilters, clearFilters } = productsSlice.actions;

export default productsSlice.reducer;

