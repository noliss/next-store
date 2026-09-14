import { describe, expect, it } from 'vitest';
import {
  addToFavorites,
  favoritesReducer,
  hydrateFavorites,
  removeFromFavorites,
} from './favorites-slice';
import type { FavoritesState } from './types';

const emptyState: FavoritesState = { ids: [] };

describe('favoritesReducer', () => {
  it('добавляет товар', () => {
    expect(favoritesReducer(emptyState, addToFavorites('a')).ids).toEqual(['a']);
  });

  it('не добавляет дубликаты', () => {
    const state: FavoritesState = { ids: ['a'] };

    expect(favoritesReducer(state, addToFavorites('a')).ids).toEqual(['a']);
  });

  it('удаляет товар', () => {
    const state: FavoritesState = { ids: ['a', 'b'] };

    expect(favoritesReducer(state, removeFromFavorites('a')).ids).toEqual(['b']);
  });

  it('восстанавливает состояние из хранилища', () => {
    expect(favoritesReducer(emptyState, hydrateFavorites(['a', 'b'])).ids).toEqual(['a', 'b']);
  });
});
