import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';

export const subCategoryApi = createApi({
  reducerPath: 'subCategory/api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://hq.fridaypos.com/new_api',
    // headers: {
    //   token: 'a29203e28e4ceee5bf59edad60ea4efb',
    // },
  }),

  endpoints: build => ({
    getSubs: build.query({
      query: params => ({
        url: '',
        method: 'Get',
        params: params,
      }),
    }),
  }),
});

export const { useGetSubsQuery } = subCategoryApi;
