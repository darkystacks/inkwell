import { FC } from 'react'
import { Link } from 'react-router-dom'
import logo from '../../assets/wysiwig_items/logo.svg'
import notFound from '../../assets/wysiwig_items/notFound.png'
import styles from './NotFound.module.scss'
const NotFound: FC = () => {
	return (
		<div className={styles.wrapper}>
			<Link to='/'>
				<img className={styles.logo} src={logo} alt='logo' />
			</Link>
			<img className={styles.notFound} src={notFound} alt='notfound' />
			<Link to='/'>
				<div className={styles.backHome}>Перейти на главную</div>
			</Link>
		</div>
	)
}

export default NotFound
