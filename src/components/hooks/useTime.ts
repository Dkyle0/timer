import { useEffect } from "react";

export const UseTimer = (isEnabled: boolean, time: number, setTime: React.Dispatch<React.SetStateAction<number>>, setIsEnabled: React.Dispatch<React.SetStateAction<boolean | undefined>> | React.Dispatch<React.SetStateAction<boolean>>) => {
	useEffect(() => {
		let interval: NodeJS.Timer;

		if (isEnabled && time > 0) {
			interval = setInterval(() => {
				setTime((prevTime) => {
					const newTime = prevTime - 1;

					if (newTime <= 0) {
						setIsEnabled(false);
						return 0;
					}
					return newTime;
				});
			}, 1000);
		}

		return () => {
			if (interval) {
				clearInterval(interval);
			}
		};
	}, [isEnabled, setIsEnabled, setTime, time]);

}
