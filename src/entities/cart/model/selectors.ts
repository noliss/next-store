import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '@/_app/store';
import { CartItem } from './types';

const selectCartState = (state: RootState) => state.cart;

export const selectCartItems = createSelector(selectCartState, (cart) => cart.items);

export const selectCartItemsCount = createSelector(selectCartItems, (items) =>
  items.reduce((sum: number, item: CartItem) => sum + item.quantity, 0)
);

export const selectCartItemByProductId = (productId: string) =>
  createSelector(selectCartItems, (items) =>
    items.find((item: CartItem) => item.productId === productId)
  );

export const selectIsInCart = (productId: string) =>
  createSelector(selectCartItems, (items) =>
    items.some((item: CartItem) => item.productId === productId)
  );
