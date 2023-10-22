import { Route, Routes } from 'react-router-dom'
import AddArticle from './pages/AddArticle'
import ArticleContainer from './pages/ArticleContainter'
import NotFound from './components/NotFound'
import './scss/app.scss'

function App() {
	return (
		<div className='wrapper'>
			<Routes>
				<Route path='/' element={<AddArticle />} />
				<Route path='/*' element={<NotFound />} />
				<Route path='/:idf' element={<ArticleContainer />} />
			</Routes>
		</div>
	)
}

export default App
