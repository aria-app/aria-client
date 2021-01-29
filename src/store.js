import { configureStore } from '@reduxjs/toolkit';

import createReducerManager from './createReducerManager';

export const reducerManager = createReducerManager();

const store = configureStore({
  reducer: reducerManager.reduce,
});

export default store;
