/// <reference types="react-scripts" />

interface TimerState {
	id: number,
	time: number,
	isEnabled: boolean,
}

interface TimersState{
	timers: TimerState[]
}
