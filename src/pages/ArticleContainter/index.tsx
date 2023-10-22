import { FC, useState } from 'react'

import DOMPurify from 'dompurify'
import { Link, useParams } from 'react-router-dom'
import logo from '../../assets/wysiwig_items/logo.svg'
import Loader from '../../components/Loader'
import NotFound from '../../components/NotFound'
import QrPopup from '../../components/QrPopup'
import { articleApi } from '../../services/ArticleService'
import './ArticleContainer.scss'
const ArticleContainer: FC = () => {
	const [qrOpen, setQrOpen] = useState(false)
	const idf = useParams()
	const { data, error, isLoading } = articleApi.useFetchArticleQuery(
		String(idf['idf'])
	)

	function createMarkup(html: string) {
		return {
			__html: DOMPurify.sanitize(html),
		}
	}

	return (
		<div className='articleBlockWrapper'>
			{isLoading && <Loader />}
			{error && <NotFound />}
			{qrOpen && <QrPopup setPopupOpen={setQrOpen} />}
			{data && (
				<div
					className='dataWrapper'
					style={data.coverImage ? { marginTop: '200px' } : {}}
				>
					{data.coverImage && (
						<img className='coverImage' src={data.coverImage} alt='cover' />
					)}
					<Link to='/'>
						<img
							className='logo'
							style={data.coverImage ? { backgroundColor: '#F8F8F8' } : {}}
							src={logo}
							alt='logo'
						/>
					</Link>
					<header>
						<div className='headerDataBlock'>
							<div className='dataDate'>{data.date}</div>
							{data.name && <div className='dataName'>{data.name}</div>}
						</div>
						<div className='shareQr' onClick={() => setQrOpen(true)}>
							Поделиться
						</div>
					</header>
					<div
						className='articleWrapper'
						style={{ backgroundColor: data.theme }}
					>
						<article>
							<h1>{data.title}</h1>
							<div dangerouslySetInnerHTML={createMarkup(data.body)}></div>
						</article>
					</div>
				</div>
			)}
		</div>
	)
}

export default ArticleContainer
