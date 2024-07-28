import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initTimerState: TimerState = {
	id: 0,
	time: 0,
	isEnabled: false,
};

export const timerSlice = createSlice({
	name: 'timer',
	initialState: initTimerState,
	reducers: {
	  setTimerData(state: TimerState, action: PayloadAction<object>) {
		return { ...state, ...action.payload };
	  },
	  resetTimerData(state: TimerState) {
		return initTimerState;
	  },
	},
  });
  
  export const { setTimerData, resetTimerData } = timerSlice.actions;
