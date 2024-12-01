import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

// Fetch wishlist for a user
export const fetchWishlist = createAsyncThunk("wishlists/fetchWishlist", async()=>{
  const response = await axios.get("https://ecommerce-app-backend-red.vercel.app/api/wishlist/wishlists/66b5faf7915e6097eb68283c")
  console.log(response)
  return response.data.items;
})

export const addToWishlist = createAsyncThunk("wishlists/addToWishlist", async ({productId})=>{
  const res = await axios.post("https://ecommerce-app-backend-red.vercel.app/api/wishlist/wishlists/66b5faf7915e6097eb68283c/items", {productId})
  return res.data
})

export const deleteWishlistItem = createAsyncThunk("wishlists/deleteWishlistItem", async (productId) => {
  await axios.delete(`https://ecommerce-app-backend-red.vercel.app/api/wishlist/wishlists/66b5faf7915e6097eb68283c/items/${productId}`);
  return productId;
});


const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState: { items: [], status: 'idle', error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWishlist.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchWishlist.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload; // Update with the array of items
      })
      .addCase(fetchWishlist.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addToWishlist.fulfilled, (state, action) => {
        state.items.push(action.payload.items[action.payload.items.length - 1]); // Add the latest item
      })
      .addCase(deleteWishlistItem.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item.productId !== action.payload);
      });
  },
});

export default wishlistSlice.reducer;



