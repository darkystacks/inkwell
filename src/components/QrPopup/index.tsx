import { FC } from 'react'
import QRCode from 'react-qr-code'
import copy from '../../assets/wysiwig_items/copy.svg'
import styles from './Qrpopup.module.scss'

interface QrPopupProps {
	setPopupOpen: (bool: boolean) => void
}

const QrPopup: FC<QrPopupProps> = ({ setPopupOpen }) => {
	let url = window.location.href
	const handleCopy = () => {
		navigator.clipboard.writeText(url)
	}

	return (
		<div className={styles.popup}>
			<div
				className={styles.popupFade}
				onClick={() => setPopupOpen(false)}
			></div>
			<div className={styles.popupWindow}>
				<h1>Поделиться статьей</h1>
				<span>Чтобы поделиться, используйте QR-код или ссылку ниже</span>
				<div className={styles.qrBlock}>
					<QRCode value={url} />
				</div>
				<div className={styles.copyLink}>
					<div>{url}</div>
					<img src={copy} alt='copy' onClick={handleCopy} />
				</div>
				<div className={styles.close} onClick={() => setPopupOpen(false)}>
					Закрыть
				</div>
			</div>
		</div>
	)
}

export default QrPopup
