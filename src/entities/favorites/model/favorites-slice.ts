import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { FavoritesState } from './types';

const initialState: FavoritesState = {
  ids: [],
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    hydrateFavorites(state, action: PayloadAction<string[]>) {
      state.ids = action.payload;
    },

    addToFavorites(state, action: PayloadAction<string>) {
      if (!state.ids.includes(action.payload)) {
        state.ids.push(action.payload);
      }
    },

    removeFromFavorites(state, action: PayloadAction<string>) {
      state.ids = state.ids.filter((id) => id !== action.payload);
    },
  },
});

export const { hydrateFavorites, addToFavorites, removeFromFavorites } = favoritesSlice.actions;

export const favoritesReducer = favoritesSlice.reducer;
