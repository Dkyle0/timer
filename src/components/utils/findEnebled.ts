export const findEnebled = (timers: TimerState[]) => {
	timers.forEach((time) => {
		if (time.isEnabled) {
			return true;
		}
	});

	return false;
};
