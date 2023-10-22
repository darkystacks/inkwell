import { JellyTriangle } from '@uiball/loaders'
import { FC } from 'react'
import styles from './Loader.module.scss'

const Loader: FC = () => {
	return (
		<div className={styles.wrapper}>
			<JellyTriangle size={60} speed={1.75} color='black' />
		</div>
	)
}

export default Loader
