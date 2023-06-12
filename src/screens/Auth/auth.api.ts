import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { baseQuery } from '../../lib/baseQuery';

export const authApi = createApi({
  reducerPath: 'login/api',
  baseQuery,
  endpoints: build => ({
    login: build.mutation({
      query: ({ email, password }) => ({
        url: '/auth/login',
        method: 'POST',
        body: {
          email,
          password,
        },
      }),
    }),
  }),
});

export const { useLoginMutation } = authApi;
