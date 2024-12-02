import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const userId = "66b5faf7915e6097eb68283c";

// Fetch cart for a user
export const fetchCart = createAsyncThunk("cart/fetchCart", async () => {
  const response = await axios.get(
    `https://ecommerce-app-backend-red.vercel.app/api/cart/${userId}`,
  );
  console.log("Fetched cart items:", response.data.items);
  return response.data.items;
});

// Add a product to the cart
export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ productId, quantity }) => {
    const res = await axios.post(
      `https://ecommerce-app-backend-red.vercel.app/api/cart/${userId}/items`,
      { productId, quantity },
    );
    return res.data.items; // return the updated cart items array
  },
);

// Remove a product from the cart
export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async (productId) => {
    await axios.delete(
      `https://ecommerce-app-backend-red.vercel.app/api/cart/${userId}/cart/items/${productId}`,
    );
    return productId;
  },
);

export const increaseQuantity = createAsyncThunk(
  "cart/increaseQuantity",
  async (productId) => {
    const response = await axios.post(
      `https://ecommerce-app-backend-red.vercel.app/api/cart/carts/${userId}/items/${productId}/increase`,
    );
    return response.data;
  },
);

export const decreaseQuantity = createAsyncThunk(
  "cart/decreaseQuantity",
  async (productId) => {
    const response = await axios.post(
      `https://ecommerce-app-backend-red.vercel.app/api/cart/carts/${userId}/items/${productId}/decrease`,
    );
    return response.data;
  },
);

// Move product from cart to wishlist
export const moveToWishlist = createAsyncThunk(
  "cart/moveToWishlist",
  async ({ productId }) => {
    await axios.post(
      `https://ecommerce-app-backend-red.vercel.app/api/cart/${userId}/wishlist/items`,
      { productId },
    );
    await axios.delete(
      `https://ecommerce-app-backend-red.vercel.app/api/cart/${userId}/items/${productId}`,
    );
    return productId;
  },
);

const cartSlice = createSlice({
  name: "cart",
  initialState: { items: [], status: "idle", error: null },
  reducers: {
    incrementQuantity: (state, action) => {
      const item = state.items.find(
        (item) => item.productId._id === action.payload,
      );
      if (item) {
        item.quantity += 1;
      }
    },
    decrementQuantity: (state, action) => {
      const item = state.items.find(
        (item) => item.productId._id === action.payload,
      );
      if (item) {
        item.quantity -= 1;
        if (item.quantity <= 0) {
          state.items = state.items.filter(
            (i) => i.productId._id !== action.payload,
          );
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload; // Update with the array of items
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.items = action.payload; // Update the state with the updated cart items
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.items = state.items.filter(
          (item) => item.productId._id !== action.payload,
        );
      })
      .addCase(increaseQuantity.fulfilled, (state, action) => {
        const item = state.items.find(
          (i) => i.productId._id === action.payload._id,
        );
        if (item) {
          item.quantity = action.payload.quantity;
        }
      })
      .addCase(decreaseQuantity.fulfilled, (state, action) => {
        const item = state.items.find(
          (i) => i.productId._id === action.payload._id,
        );
        if (item) {
          item.quantity = action.payload.quantity;
        }
      })
      .addCase(moveToWishlist.fulfilled, (state, action) => {
        state.items = state.items.filter(
          (item) => item.productId !== action.payload,
        );
      });
  },
});

export const { incrementQuantity, decrementQuantity } = cartSlice.actions;
export default cartSlice.reducer;
