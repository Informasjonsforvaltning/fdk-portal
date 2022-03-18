import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import env from '../../env';
import { CommunityPost, CommunityTopic, CommunityUser } from '../../types';

import AuthService from '../../services/auth';

const { FDK_USER_FEEDBACK_SERVICE_BASE_URI } = env;

export const commentsApi = createApi({
  reducerPath: 'commentsApi',
  tagTypes: ['Comments', 'User'],
  baseQuery: fetchBaseQuery({
    baseUrl: `${FDK_USER_FEEDBACK_SERVICE_BASE_URI}`,
    prepareHeaders: async headers => {
      headers.set('Access-Control-Allow-Origin', '*');
      headers.set('Authorization', await AuthService.getAuthorizationHeader());
      return headers;
    }
  }),
  endpoints: builder => ({
    getThreadById: builder.query<CommunityTopic, { id: string; page: number }>({
      query: ({ id, page }) => `/thread/${id}?page=${page}`,
      providesTags: (_result, _error, { id, page }) => [
        { type: 'Comments', id: `${id}-${page}` }
      ]
    }),

    postComment: builder.mutation<
      CommunityPost,
      { id: string; post: Partial<CommunityPost> }
    >({
      query: ({ id, post }) => ({
        url: `/thread/${id}`,
        method: 'POST',
        body: post
      }),
      invalidatesTags: (_result, _error, arg) => [
        { type: 'Comments', id: `${arg.id}-1` }
      ]
    }),

    updateComment: builder.mutation<
      CommunityPost,
      { id: string; post: Partial<CommunityPost>; page: number }
    >({
      query: ({ id, post }) => ({
        url: `/thread/${id}/${post.pid}?postIndex=${post.index}`,
        method: 'PUT',
        body: post
      }),
      invalidatesTags: (_result, _error, arg) => [
        { type: 'Comments', id: `${arg.id}-${arg.page}` }
      ]
    }),

    deleteComment: builder.mutation<
      void,
      { id: string; post: Partial<CommunityPost>; invalidatedPages: number[] }
    >({
      query: ({ id, post }) => ({
        url: `/thread/${id}/${post.pid}?postIndex=${post.index}`,
        method: 'DELETE'
      }),
      invalidatesTags: (_result, _error, arg) =>
        arg.invalidatedPages.map(page => ({
          type: 'Comments',
          id: `${arg.id}-${page}`
        }))
    }),

    getUser: builder.query<CommunityUser, void>({
      query: () => ({
        url: `/current-user`,
        method: 'GET'
      }),
      providesTags: ['User']
    })
  })
});

export const {
  useGetThreadByIdQuery,
  useLazyGetThreadByIdQuery,
  usePostCommentMutation,
  useUpdateCommentMutation,
  useDeleteCommentMutation,
  useGetUserQuery
} = commentsApi;
