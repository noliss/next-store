import { CART_STORAGE_KEY, hydrateCart, selectCartItems, type CartItem } from '@/entities/cart';
import {
  FAVORITES_STORAGE_KEY,
  hydrateFavorites,
  selectFavoriteIds,
} from '@/entities/favorites';
import { definePersistSlice, type AnyPersistSliceConfig } from './use-persist-redux-slice';

const CART_FALLBACK: CartItem[] = [];
const FAVORITES_FALLBACK: string[] = [];

export const persistRegistry: AnyPersistSliceConfig[] = [
  definePersistSlice<CartItem[]>({
    storageKey: CART_STORAGE_KEY,
    fallback: CART_FALLBACK,
    selectValue: selectCartItems,
    hydrateAction: hydrateCart,
  }),
  definePersistSlice<string[]>({
    storageKey: FAVORITES_STORAGE_KEY,
    fallback: FAVORITES_FALLBACK,
    selectValue: selectFavoriteIds,
    hydrateAction: hydrateFavorites,
  }),
];
