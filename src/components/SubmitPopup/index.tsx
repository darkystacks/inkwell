import { FC } from 'react'
import styles from './SubmitPopup.module.scss'

interface SubmitPopupProps {
	setPopupOpen: (bool: boolean) => void
	handlePublish: () => void
}

const SubmitPopup: FC<SubmitPopupProps> = ({ setPopupOpen, handlePublish }) => {
	const handleSubmitArticle = () => {
		handlePublish()
		setPopupOpen(false)
	}
	return (
		<div className={styles.popup}>
			<div
				className={styles.popupFade}
				onClick={() => setPopupOpen(false)}
			></div>
			<div className={styles.popupWindow}>
				<h1>Предупреждение</h1>
				<span>
					Вы уверены, что хотите опубликовать статью? После публикации
					возможность редактирования отсутствует
				</span>
				<div className={styles.buttons}>
					<div
						className={styles.editButton}
						onClick={() => setPopupOpen(false)}
					>
						Редактировать
					</div>
					<div className={styles.publishButton} onClick={handleSubmitArticle}>
						Опубликовать
					</div>
				</div>
			</div>
		</div>
	)
}

export default SubmitPopup
