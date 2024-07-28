import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initTimersState:TimersState = {
	timers: [],
};

export const timersSlice = createSlice({
	name: 'timers',
	initialState: initTimersState,
	reducers: {
		addTimer(state: TimersState, action: PayloadAction<TimerState>) {
			state.timers.push(action.payload);
		  },
	      deleteTimer(state, action: PayloadAction<number>) {
			state.timers = state.timers.filter(timer => timer.id !== action.payload);
		  },
		  updateTimer(state, action: PayloadAction<TimerState>) {
			const index = state.timers.findIndex(timer => timer.id === action.payload.id);
			if (index !== -1) {
			  state.timers[index] = action.payload;
			}
		  },
		},
	  });
	  
	  export const { addTimer, deleteTimer, updateTimer } = timersSlice.actions;
