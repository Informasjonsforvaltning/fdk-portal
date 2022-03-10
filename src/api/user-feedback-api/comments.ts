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
    getThreadById: builder.query<CommunityTopic, string>({
      query: id => `/thread/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'Comments', id }]
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
        { type: 'Comments', id: arg.id }
      ]
    }),

    updateComment: builder.mutation<
      CommunityPost,
      { id: string; post: Partial<CommunityPost> }
    >({
      query: ({ id, post }) => ({
        url: `/thread/${id}/${post.pid}`,
        method: 'PUT',
        body: post
      }),
      invalidatesTags: (_result, _error, arg) => [
        { type: 'Comments', id: arg.id }
      ]
    }),

    deleteComment: builder.mutation<void, { id: string; postId: string }>({
      query: ({ id, postId }) => ({
        url: `/thread/${id}/${postId}`,
        method: 'DELETE'
      }),
      invalidatesTags: (_result, _error, arg) => [
        { type: 'Comments', id: arg.id }
      ]
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
  usePostCommentMutation,
  useUpdateCommentMutation,
  useDeleteCommentMutation,
  useGetUserQuery
} = commentsApi;
