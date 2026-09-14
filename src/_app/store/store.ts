import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { cartReducer } from '@/entities/cart';
import { favoritesReducer } from '@/entities/favorites';
import { persistReducer } from '../model/persist-slice';

const rootReducer = combineReducers({
  cart: cartReducer,
  favorites: favoritesReducer,
  persist: persistReducer,
});

export const makeStore = () => configureStore({ reducer: rootReducer });

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = AppStore['dispatch'];
