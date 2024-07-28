import styles from './add-timer.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { ControlPanel } from '../../control-panel/control-panel';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTimer } from '../../store/reducers';

export const AddTimer = () => {
	const [time, setTime] = useState(0);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleAddSec = () => {
		setTime((prev) => {
			if (prev + 1 < 18001) {
				return prev + 1;
			}
			return prev;
		});
	};
	const handleReduceSec = () => {
		setTime((prev) => {
			if (prev > 0) {
				return prev - 1;
			}
			return prev;
		});
	};

	const handleAddMin = () => {
		setTime((prev) => {
			if (prev + 60 < 18001) {
				return prev + 60;
			}
			return prev;
		});
	};

	const handleReduceMin = () => {
		setTime((prev) => {
			if (prev >= 60) {
				return prev - 60;
			}
			return prev;
		});
	};

	const handleCreateTimer = () => {
		if (time > 0) {
			const newTimer: TimerState = {
				id: Date.now(),
				time: time,
				isEnabled: true,
			};
			dispatch(addTimer(newTimer));
			navigate(`/timer/${newTimer.id}`);
		}
	};
	return (
		<div className={styles.container}>
			<ControlPanel>
				<Link to={'/'}>
					<span>Отменить</span>
				</Link>
			</ControlPanel>
			<span className={styles.head}>Таймер</span>
			<div className={styles.grid}>
				<div className={styles.item} onClick={handleReduceMin}>
					<span>{time / 60 - 1 >= 0 && (time / 60 - 1).toFixed(0)}</span>
					<span className={styles.hidenText}>{`мин`}</span>
				</div>
				<div className={styles.item} onClick={handleReduceSec}>
					<span>{(time % 60) - 1 >= 0 && (time % 60) - 1}</span>
					<span className={styles.hidenText}>{`ceк`}</span>
				</div>
				<div className={styles.item}>
					<span>{`${(time / 60).toFixed(0)}`}</span>
					<span className={styles.timerText}>{`мин`}</span>
				</div>
				<div className={styles.item}>
					<span>{`${time % 60}`}</span>
					<span className={styles.timerText}>{`ceк`}</span>
				</div>
				<div className={styles.item} onClick={handleAddMin}>
					<span>{(time / 60 + 1).toFixed(0)}</span>
					<span className={styles.hidenText}>{`мин`}</span>
				</div>
				<div className={styles.item} onClick={handleAddSec}>
					<span>{(time % 60) + 1}</span>
					<span className={styles.hidenText}>{`сек`}</span>
				</div>
			</div>
			<button onClick={handleCreateTimer} className={styles.startButton}>
				<span className={styles.timerText}>Старт</span>
			</button>
		</div>
	);
};
