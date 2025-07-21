import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Helper Function to load cart from localStorage
const loadCartFromLocalStorage = () => {
  try {
    const storeData = localStorage.getItem("cart");
    return storeData ? JSON.parse(storeData) : { products: [] }; // ✅ return object not array
  } catch (error) {
    console.error("Failed to load cart:", error);
    return { products: [] };
  }
};

// Helper Function to save cart to localStorage
const saveCartToStorage = (cart) => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

// ✅ FIX: spelling typo "rejecWithValue" → "rejectWithValue"
export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async ({ userId, guestId }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/cart`,
        {
          params: { userId, guestId },
        }
      );
      return response.data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Add items to the cart for a user or guest
export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async (
    { productId, quantity, size, color, guestId, userId },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/cart`,
        {
          productId,
          quantity,
          size,
          color,
          userId,
          guestId,
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Update cart item quantity
export const updateCartItemQuantity = createAsyncThunk(
  "cart/updateCartItemQuantity",
  async (
    { quantity, productId, userId, guestId, color, size },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/cart`,
        {
          productId,
          quantity,
          color,
          size,
          guestId,
          userId,
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Remove item from the cart
export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async ({ productId, color, size, guestId, userId }, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: "DELETE",
        url: `${import.meta.env.VITE_BACKEND_URL}/api/cart`,
        data: { productId, color, size, guestId, userId },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Merge guest cart into logged-in user cart
export const mergeCart = createAsyncThunk(
  "cart/mergeCart",
  async ({ guestId, user }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/cart/merge`, // ✅ fixed URL
        { guestId, user },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: loadCartFromLocalStorage(),
    loading: false,
    error: null,
  },
  reducers: {
    clearCart: (state) => {
      state.cart = { products: [] };
      localStorage.removeItem("cart");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, actions) => {
        state.loading = false;
        state.cart = actions.payload;
        saveCartToStorage(actions.payload);
      })
      .addCase(fetchCart.rejected, (state, actions) => {
        state.loading = false;
        state.error = actions.error.message || "Failed to fetch cart";
      })
      .addCase(addToCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addToCart.fulfilled, (state, actions) => {
        state.loading = false;
        state.cart = actions.payload;
        saveCartToStorage(actions.payload);
      })
      .addCase(addToCart.rejected, (state, actions) => {
        state.loading = false;
        state.error = actions.payload?.message || "Failed to add to cart";
      })
      .addCase(updateCartItemQuantity.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCartItemQuantity.fulfilled, (state, actions) => {
        state.loading = false;
        state.cart = actions.payload;
        saveCartToStorage(actions.payload);
      })
      .addCase(updateCartItemQuantity.rejected, (state, actions) => {
        state.loading = false;
        state.error =
          actions.payload?.message || "Failed to update item quantity";
      })
      .addCase(removeFromCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeFromCart.fulfilled, (state, actions) => {
        state.loading = false;
        state.cart = actions.payload;
        saveCartToStorage(actions.payload);
      })
      .addCase(removeFromCart.rejected, (state, actions) => {
        state.loading = false;
        state.error = actions.payload?.message || "Failed to remove cart";
      })
      .addCase(mergeCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(mergeCart.fulfilled, (state, actions) => {
        state.loading = false;
        state.cart = actions.payload;
        saveCartToStorage(actions.payload);
      })
      .addCase(mergeCart.rejected, (state, actions) => {
        state.loading = false;
        state.error = actions.payload?.message || "Failed to merge cart";
      });
  },
});

export const { clearCart } = cartSlice.actions;
export default cartSlice.reducer;
