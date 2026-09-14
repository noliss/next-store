import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { CartItem, CartState } from './types';

const initialState: CartState = {
  items: [],
};

interface AddToCartPayload {
  productId: string;
  maxQuantity?: number;
}

interface SetQuantityPayload {
  productId: string;
  quantity: number;
  maxQuantity?: number;
}

const clampQuantity = (quantity: number, maxQuantity?: number) => {
  const safe = Math.max(1, quantity);
  return maxQuantity ? Math.min(safe, maxQuantity) : safe;
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    hydrateCart(state, action: PayloadAction<CartItem[]>) {
      state.items = action.payload;
    },

    addToCart(state, action: PayloadAction<AddToCartPayload>) {
      const { productId, maxQuantity } = action.payload;
      const existing = state.items.find((item) => item.productId === productId);

      if (existing) {
        existing.quantity = clampQuantity(existing.quantity + 1, maxQuantity);
        return;
      }

      state.items.push({
        productId,
        quantity: clampQuantity(1, maxQuantity),
      });
    },

    setCartItemQuantity(state, action: PayloadAction<SetQuantityPayload>) {
      const { productId, quantity, maxQuantity } = action.payload;
      const item = state.items.find((entry) => entry.productId === productId);

      if (!item) return;

      if (quantity <= 0) {
        state.items = state.items.filter((entry) => entry.productId !== productId);
        return;
      }

      item.quantity = clampQuantity(quantity, maxQuantity);
    },

    removeFromCart(state, action: PayloadAction<string>) {
      state.items = state.items.filter((item) => item.productId !== action.payload);
    },
  },
});

export const { hydrateCart, addToCart, setCartItemQuantity, removeFromCart } = cartSlice.actions;

export const cartReducer = cartSlice.reducer;
