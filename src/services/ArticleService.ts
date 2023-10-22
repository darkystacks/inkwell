import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'
import { IArticle } from '../models/IArticle'

export const articleApi = createApi({
	reducerPath: 'articleApi',
	baseQuery: fetchBaseQuery({
		baseUrl: 'http://212.193.62.200:8080/api',
	}),
	tagTypes: ['Article'],
	endpoints: builder => ({
		fetchArticle: builder.query<IArticle, string>({
			query: (link: string) => ({
				url: `/articles?id=${link}`,
			}),
		}),
		createArticle: builder.mutation<IArticle, IArticle>({
			query: article => ({
				url: '/articles',
				method: 'POST',
				body: article,
			}),
		}),
	}),
})
