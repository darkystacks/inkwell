import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'
import { IArticle } from '../models/IArticle'

export const articleApi = createApi({
	reducerPath: 'articleApi',
	baseQuery: fetchBaseQuery({
		baseUrl: 'https://publishing-service-pn20.onrender.com/api',
	}),
	tagTypes: ['Article'],
	endpoints: builder => ({
		fetchArticle: builder.query<IArticle, string>({
			query: (link: string) => ({
				url: `/articles?id=${link}`,
				mode: 'no-cors',
			}),
		}),
		createArticle: builder.mutation<IArticle, IArticle>({
			query: article => ({
				url: '/articles',
				method: 'POST',
				body: article,
				mode: 'no-cors',
			}),
		}),
	}),
})
