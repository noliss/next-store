import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface PersistState {
  rehydratedKeys: string[];
}

const initialState: PersistState = {
  rehydratedKeys: [],
};

const persistSlice = createSlice({
  name: 'persist',
  initialState,
  reducers: {
    markPersistRehydrated(state, action: PayloadAction<string>) {
      if (!state.rehydratedKeys.includes(action.payload)) {
        state.rehydratedKeys.push(action.payload);
      }
    },
  },
});

export const { markPersistRehydrated } = persistSlice.actions;
export const persistReducer = persistSlice.reducer;
