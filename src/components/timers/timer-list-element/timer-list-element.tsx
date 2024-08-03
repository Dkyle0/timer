import styles from './timer-list-element.module.css';
import { ReactComponent as PlayIcon } from '../../../assets/play-icon.svg';
import { ReactComponent as PauseIcon } from '../../../assets/pause-icon.svg';
import { ReactComponent as DeleteIcon } from '../../../assets/dell-icon.svg';
import { ReactComponent as ArrowIcon } from '../../../assets/arrow-icon.svg';
import { useState, useEffect } from 'react';
import { UseTimer } from '../../hooks/useTime';
import { handleStartPause } from '../../utils/handleStartPause';
import { useNavigate } from 'react-router-dom';

interface ITimerListElement extends TimerState {
	isEditing: boolean;
	onDelete: (id: number) => void;
}

const displayTime = (time: number) => {
	let result = '';

	if (Math.floor(time / 60) < 10) {
		result = `0${Math.floor(time / 60)}:`;
	} else {
		result = `${Math.floor(time / 60)}:`;
	}

	if (time % 60 < 10) {
		result += `0${time % 60}`;
	} else {
		result += `${time % 60}`;
	}

	return result;
};

export const TimerListElement = ({
	id,
	time,
	isEnabled,
	isEditing,
	onDelete,
}: ITimerListElement) => {
	const [elementTime, setElementTime] = useState(time || 0);
	const [elementIsEnabled, setElementIsEnabled] = useState(isEnabled);
	const navigate = useNavigate();

	UseTimer(elementIsEnabled, elementTime, setElementTime, setElementIsEnabled);

	useEffect(() => {
		setElementTime(time);
		setElementIsEnabled(isEnabled);
	}, [time, isEnabled]);

	return (
		<>
			<div className={styles.timerItem}>
				<div className={styles.delArea}>
					{isEditing && (
						<div className={styles.deleteButton} onClick={() => onDelete(id)}>
							<DeleteIcon />
						</div>
					)}
					<div className={styles.timerDetails}>
						<span className={styles.timerTime}>
							{displayTime(elementTime)}
						</span>
						<span
							className={styles.timerLabel}
						>{`${Math.ceil(elementTime / 60)} мин`}</span>
					</div>
				</div>
				<div className={styles.buttonsContainer}>
					{isEditing ? (
						<button
							className={styles.arrowButton}
							onClick={() => navigate(`/timer/${id}`)}
						>
							<ArrowIcon />
						</button>
					) : (
						<button
							className={
								elementIsEnabled ? styles.pauseButton : styles.playButton
							}
							onClick={() =>
								handleStartPause(elementTime, setElementIsEnabled)
							}
						>
							{elementIsEnabled ? <PauseIcon /> : <PlayIcon />}
						</button>
					)}
				</div>
			</div>
			<hr />
		</>
	);
};
