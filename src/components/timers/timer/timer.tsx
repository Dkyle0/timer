import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { UseTimer } from '../../hooks/useTime';
import { handleStartPause } from '../../utils/handleStartPause';
import { ControlPanel } from '../../control-panel/control-panel';
import styles from './timer.module.css';

export const Timer = () => {
	const { id } = useParams<{ id: string }>();
	const timerId = parseInt(id || '', 10);

	const timer = useSelector((state: RootState) =>
		state.timers.timers.find((timer) => timer.id === timerId),
	);

	const totalTime = timer?.time || 0;
	const [time, setTime] = useState(totalTime);
	const [isEnabled, setIsEnabled] = useState(timer?.isEnabled);

	// Рассчитываем длину окружности круга
	const circumference = 280 * Math.PI;
	// Устанавливаем strokeDasharray, чтобы равнялся длине окружности
	const strokeDasharray = `${circumference}`;
	// Рассчитываем уменьшение круга, чтобы соответствовать оставшемуся времени
	const strokeDashoffset = circumference - (circumference * time) / totalTime;

	UseTimer(isEnabled || false, time, setTime, setIsEnabled);

	useEffect(() => {
		if (time === 0) setIsEnabled(false);
	}, [time]);

	if (!timer) {
		return <div className={styles.timerText}>Таймер не найден</div>;
	}

	const handleResetTimer = () => {
		setTime(totalTime);
		setIsEnabled(false);
	};

	return (
		<div className={styles.container}>
			<ControlPanel>
				<Link to={'/'}>
					<span className={styles.backLink}>Таймеры</span>
				</Link>
			</ControlPanel>
			<div className={styles.timerContainer}>
				<svg
					width="300"
					height="300"
					viewBox="0 0 300 300"
					className={styles.circle}
				>
					<circle
						cx="150"
						cy="150"
						r="140"
						stroke="#29A354"
						strokeWidth="10" // Устанавливаем ширину штриха круга
						fill="transparent"
						strokeDasharray={strokeDasharray}
						strokeDashoffset={strokeDashoffset}
						style={{
							transform: 'rotate(-90deg)',
							transformOrigin: '50% 50%',
						}}
					/>
				</svg>
				<div className={styles.timerText}>{`${Math.floor(time / 60)
					.toString()
					.padStart(
						2,
						'0',
					)} : ${(time % 60).toString().padStart(2, '0')}`}</div>
			</div>
			<div className={styles.buttonContainer}>
				<button
					className={`${styles.button} ${styles.pauseButton}`}
					onClick={() => handleStartPause(time, setIsEnabled)}
				>
					{!isEnabled ? 'Возобновить' : 'Пауза'}
				</button>
				<button
					className={`${styles.button} ${styles.resetButton}`}
					onClick={handleResetTimer}
				>
					Отмена
				</button>
			</div>
		</div>
	);
};
