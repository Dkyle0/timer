export const handleStartPause = (
	time: number, 
	setIsEnabled: React.Dispatch<React.SetStateAction<boolean | undefined>> | React.Dispatch<React.SetStateAction<boolean>>
) => {
	if (time > 0) {
		setIsEnabled((prev: boolean | undefined) => !prev);
	}
};
