import styles from './timers.module.css';
import { Link, useMatch } from 'react-router-dom';
import { ControlPanel } from '../control-panel/control-panel';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { TimerListElement } from './timer-list-element/timer-list-element';
import {
	deleteTimer,
	startAllTimers,
	pauseAllTimers,
	resetAllTimers,
} from '../store/reducers';
import { useState, useCallback } from 'react';

export const Timers = () => {
	const [isEnabled, setIsEnabled] = useState(false);
	const timers = useSelector((state: RootState) => state.timers.timers);
	const isEditing = !!useMatch('/timers/edit');
	const dispatch = useDispatch();

	const handleDelete = useCallback(
		(id: number) => {
			dispatch(deleteTimer(id));
		},
		[dispatch],
	);

	const handleResetTimers = useCallback(() => {
		dispatch(resetAllTimers());
		setIsEnabled(false);
	}, [dispatch]);

	const handleStartPauseTimers = useCallback(() => {
		if (isEnabled) {
			dispatch(pauseAllTimers());
		} else {
			dispatch(startAllTimers());
		}
		setIsEnabled(!isEnabled);
	}, [dispatch, isEnabled]);

	return (
		<div className={styles.container}>
			<ControlPanel>
				{isEditing ? (
					<Link to={'/'}>
						<span className={styles.leftControlText}>Готово</span>
					</Link>
				) : (
					<Link to={'/timers/edit'}>
						<span className={styles.leftControlText}>Править</span>
					</Link>
				)}

				<Link to={'/timers/add'}>
					<span className={styles.rightControlText}>+</span>
				</Link>
			</ControlPanel>
			<h1>{`Таймеры`}</h1>
			<hr />
			<div className={styles.timersList}>
				{timers.map((timer) => (
					<TimerListElement
						key={timer.id}
						{...timer}
						isEditing={isEditing}
						onDelete={handleDelete}
					/>
				))}
			</div>
			{timers.length > 0 && (
				<div className={styles.buttonContainer}>
					<button
						className={`${styles.button} ${isEnabled ? styles.pauseButton : styles.playButton}`}
						onClick={handleStartPauseTimers}
					>
						{isEnabled ? 'Пауза' : 'Старт'}
					</button>
					<button
						className={`${styles.button} ${styles.resetButton}`}
						onClick={handleResetTimers}
					>
						Сбросить
					</button>
				</div>
			)}
		</div>
	);
};
