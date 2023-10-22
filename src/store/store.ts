import { configureStore } from '@reduxjs/toolkit'
import { articleApi } from '../services/ArticleService'

export const store = configureStore({
	reducer: {
		[articleApi.reducerPath]: articleApi.reducer,
	},
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware().concat(articleApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
