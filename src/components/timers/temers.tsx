import styles from './timers.module.css';
import { Link, useMatch } from 'react-router-dom';
import { ControlPanel } from '../control-panel/control-panel';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { TimerListElement } from './timer-list-element/timer-list-element';
import { deleteTimer } from '../store/reducers';

export const Timers = () => {
	const timers = useSelector((state: RootState) => state.timers.timers);
	const isEditing = !!useMatch('/timers/edit');
	const dispatch = useDispatch();

	const handleDelete = (id: number) => {
		dispatch(deleteTimer(id));
	};

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
		</div>
	);
};
