import { EditorState, convertToRaw } from 'draft-js'
import draftToHtml from 'draftjs-to-html'
import { ChangeEvent, FC, useEffect, useState } from 'react'
import { Editor } from 'react-draft-wysiwyg'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

import { useNavigate } from 'react-router-dom'
import {
	boldIcon,
	colorIcon,
	imageIcon,
	linkIcon,
	orderedIcon,
	underlineIcon,
	unorderedIcon,
} from '../../assets/wysiwig_items/light_items'
import logo from '../../assets/wysiwig_items/logo.svg'
import CoverImgPopup from '../../components/CoverImgPopup'
import SubmitPopup from '../../components/SubmitPopup'
import { IArticle } from '../../models/IArticle'
import { articleApi } from '../../services/ArticleService'
import './AddArticle.scss'

const AddArticle: FC = () => {
	const [createArticle, { data }] = articleApi.useCreateArticleMutation()
	const navigate = useNavigate()
	const [editorState, setEditorState] = useState<EditorState>(() =>
		EditorState.createEmpty()
	)

	const [convertedContent, setConvertedContent] = useState('')
	const [title, setTitle] = useState('')
	const [author, setAuthor] = useState('')
	const [coverImage, setCoverImage] = useState('')
	const [articleTheme, setArticleTheme] = useState('')

	const [submitPopupOpen, setSubmitPopupOpen] = useState(false)
	const [coverPopupOpen, setCoverPopupOpen] = useState(false)

	const D = new Date()

	useEffect(() => {
		let html = draftToHtml(convertToRaw(editorState.getCurrentContent()))
		setConvertedContent(html)
	}, [editorState])

	useEffect(() => {
		if (data) {
			navigate(data.id)
		}
	}, [data])

	const handlePublish = () => {
		createArticle({
			title,
			coverImage,
			name: author,
			date:
				('0' + D.getDate()).slice(-2) +
				'-' +
				('0' + (D.getMonth() + 1)).slice(-2),
			body: convertedContent,
			theme: articleTheme,
		} as IArticle)
	}

	const handlePopupOpening = () => {
		if (!title) {
			alert('Поле "заголовок" должно быть заполнено')
			return
		}
		if (convertedContent.length <= 8) {
			alert('А где же история?...')
			return
		}
		setSubmitPopupOpen(true)
	}

	return (
		<div
			className='add-wrapper'
			style={{
				marginTop: coverImage && '280px',
				backgroundColor: articleTheme && articleTheme,
			}}
		>
			{submitPopupOpen && (
				<SubmitPopup
					setPopupOpen={setSubmitPopupOpen}
					handlePublish={handlePublish}
				/>
			)}
			{coverPopupOpen && (
				<CoverImgPopup
					setPopupOpen={setCoverPopupOpen}
					setImage={setCoverImage}
				/>
			)}
			{coverImage && (
				<img className='coverImg' src={coverImage} alt='ссылочка невалид(((' />
			)}
			<img
				className='logo'
				src={logo}
				alt='logo'
				style={coverImage ? { top: '235px' } : {}}
			/>
			<div
				onClick={handlePopupOpening}
				className='publish'
				style={coverImage ? { top: '235px' } : {}}
			>
				Опубликовать
			</div>
			<div className='coverBlock'>
				{!coverImage ? (
					<div className='addCover' onClick={() => setCoverPopupOpen(true)}>
						<span>Добавить обложку</span>
					</div>
				) : (
					<div className='addCover' onClick={() => setCoverImage('')}>
						<span>Удалить обложку</span>
					</div>
				)}
				<div className='chooseTheme'>
					<select onChange={e => setArticleTheme(e.target.value)}>
						<option value=''>Стандартная тема</option>
						<option value='rgb(254,247,181)'>Лимон</option>
						<option value='rgb(255,214,162)'>Персик</option>
						<option value='rgb(208,199,227)'>Лаванда</option>
						<option value='rgb(254,228,232)'>Роза</option>
						<option value='rgb(227,242,232)'>Мята</option>
						<option value='rgb(230,230,230)'>Авокадо</option>
						<option value='rgb(191,159,200)'>Черника</option>
						<option value='rgb(225,135,145)'>Клубника</option>
						<option value='rgb(140,161,211)'>Голубика</option>
					</select>
				</div>
			</div>
			<input
				type='text'
				value={title}
				onChange={(e: ChangeEvent<HTMLInputElement>) =>
					setTitle(e.target.value)
				}
				className='inputTitle'
				placeholder='Заголовок'
				maxLength={120}
			/>
			<input
				type='text'
				value={author}
				onChange={(e: ChangeEvent<HTMLInputElement>) =>
					setAuthor(e.target.value)
				}
				className='inputAuthor'
				placeholder='Имя автора'
				maxLength={20}
			/>
			<Editor
				editorState={editorState}
				onEditorStateChange={setEditorState}
				wrapperClassName='wrapper-class'
				editorClassName='editor-class'
				toolbarClassName='toolbar-class'
				placeholder='Расскажите свою историю...'
				toolbar={{
					options: [
						'inline',
						'blockType',
						'list',
						'colorPicker',
						'link',
						'image',
					],
					inline: {
						inDropdown: false,
						className: 'inline-styling',
						component: undefined,
						dropdownClassName: undefined,
						options: ['bold', 'italic', 'underline', 'strikethrough'],
						bold: { icon: boldIcon, className: 'icon' },
						italic: { className: 'icon' },
						underline: { icon: underlineIcon, className: 'icon' },
						strikethrough: { className: 'icon' },
					},
					blockType: {
						inDropdown: true,
						options: ['Normal', 'H2', 'H3', 'Blockquote'],
						className: undefined,
						component: undefined,
						dropdownClassName: undefined,
					},
					list: {
						inDropdown: false,
						className: undefined,
						component: undefined,
						dropdownClassName: undefined,
						options: ['unordered', 'ordered'],
						unordered: { icon: unorderedIcon, className: 'icon' },
						ordered: { icon: orderedIcon, className: 'icon' },
					},
					colorPicker: {
						icon: colorIcon,
						className: 'icon desktopIcon',
						component: undefined,
						popupClassName: 'chooseColor',
						colors: [
							'rgb(254,247,181)',
							'rgb(255,214,162)',
							'rgb(208,199,227)',
							'rgb(254,228,232)',
							'rgb(227,242,232)',
							'rgb(230,230,230)',
							'rgb(191,159,200)',
							'rgb(225,135,145)',
							'rgb(140,161,211)',
						],
					},
					link: {
						inDropdown: false,
						className: undefined,
						component: undefined,
						popupClassName: undefined,
						dropdownClassName: undefined,
						showOpenOptionOnHover: true,
						defaultTargetOption: '_self',
						options: ['link'],
						link: { icon: linkIcon, className: 'icon desktopIcon' },
						linkCallback: undefined,
					},
					image: {
						icon: imageIcon,
						className: 'icon desktopIcon',
						component: undefined,
						popupClassName: undefined,
						urlEnabled: true,
						uploadEnabled: true,
						alignmentEnabled: true,
						uploadCallback: undefined,
						previewImage: false,
						inputAccept: 'image/gif,image/jpeg,image/jpg,image/png,image/svg',
						alt: { present: false, mandatory: false },
						defaultSize: {
							height: 'auto',
							width: 'auto',
						},
					},
				}}
			/>
		</div>
	)
}

export default AddArticle
