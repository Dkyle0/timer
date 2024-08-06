import styles from './standart-button.module.css';

interface IStandartButton {
	children: React.ReactNode;
	extendedStyle?: string;
	handleClick?: () => void;
}

export const StandartButton = ({
	children,
	extendedStyle,
	handleClick,
}: IStandartButton) => {
	return (
		<button
			className={`${styles.button} ${extendedStyle || ''}`}
			onClick={() => {
				handleClick && handleClick();
			}}
		>
			{children}
		</button>
	);
};
