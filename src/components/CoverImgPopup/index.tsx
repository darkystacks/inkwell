import { FC, useState } from 'react'
import styles from './CoverImgPopup.module.scss'

interface CoverImgPopupProps {
	setPopupOpen: (bool: boolean) => void
	setImage: (img: string) => void
}

const CoverImgPopup: FC<CoverImgPopupProps> = ({ setPopupOpen, setImage }) => {
	const [imageToUpload, setImageToUpload] = useState('')
	const handleUpload = () => {
		setImage(imageToUpload)
		setPopupOpen(false)
	}

	return (
		<div className={styles.popup}>
			<div
				className={styles.popupFade}
				onClick={() => setPopupOpen(false)}
			></div>
			<div className={styles.popupWindow}>
				<h1>Загрузка обложки</h1>
				<span>
					Чтобы загрузить обложку для статьи, вставьте ссылку на изображение в
					поле ниже
				</span>
				<input
					className={styles.input}
					type='text'
					placeholder='ссылка на картинку...'
					onChange={e => setImageToUpload(e.target.value)}
				/>

				<div className={styles.close} onClick={handleUpload}>
					Загрузить
				</div>
			</div>
		</div>
	)
}

export default CoverImgPopup
