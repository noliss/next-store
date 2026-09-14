import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '@/_app/store';

const selectFavoritesState = (state: RootState) => state.favorites;

export const selectFavoriteIds = createSelector(selectFavoritesState, (favorites) => favorites.ids);

export const selectFavoritesCount = createSelector(selectFavoriteIds, (ids) => ids.length);

export const selectIsFavorite = (productId: string) => (state: RootState) =>
  selectFavoriteIds(state).includes(productId);
