import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { timerSlice, timersSlice } from './reducers';

const rootReducer = combineReducers({
  timer: timerSlice.reducer,
  timers: timersSlice.reducer,
});

export type RootState = ReturnType<typeof store.getState>

export const store = configureStore({
  reducer: rootReducer,
});
