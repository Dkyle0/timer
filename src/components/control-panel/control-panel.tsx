import styles from './control-panel.module.css';
import { FC, PropsWithChildren } from 'react';

export const ControlPanel: FC<PropsWithChildren<{}>> = ({ children }) => {
	return <div className={styles.control}>{children}</div>;
};
