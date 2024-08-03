import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TimerState {
	id: number;
	time: number;
	isEnabled: boolean;
}

interface TimersState {
	timers: TimerState[];
}

const initTimersState: TimersState = {
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
			state.timers = state.timers.filter((timer) => timer.id !== action.payload);
		},
		updateTimer(state, action: PayloadAction<TimerState>) {
			const index = state.timers.findIndex(
				(timer) => timer.id === action.payload.id,
			);
			if (index !== -1) {
				state.timers[index] = action.payload;
			}
		},
		startAllTimers(state) {
			state.timers = state.timers.map((timer) => ({
				...timer,
				isEnabled: true,
			}));
		},
		pauseAllTimers(state) {
			state.timers = state.timers.map((timer) => ({
				...timer,
				isEnabled: false,
			}));
		},
		resetAllTimers(state) {
			state.timers = state.timers.map((timer) => ({
				...timer,
				time: 0,
				isEnabled: false,
			}));
		},
	},
});

export const {
	addTimer,
	deleteTimer,
	updateTimer,
	startAllTimers,
	pauseAllTimers,
	resetAllTimers,
} = timersSlice.actions;
export default timersSlice.reducer;
