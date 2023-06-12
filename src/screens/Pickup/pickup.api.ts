import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';

export const outletsApi = createApi({
  reducerPath: 'outlets/api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://hq.fridaypos.com',
    headers: {
      'Content-Type': 'application/json',
      'Accept-Encoding': 'gzip, deflate,br',
      Accept: '*/*',
      token: 'a29203e28e4ceee5bf59edad60ea4efb',
    },
  }),

  endpoints: build => ({
    getOutlets: build.query({
      query: (params: any) => ({
        url: '/new_api/companies/get_stores_locations?city=Lahore',
        method: 'Get',
        params: params,
      }),
    }),
  }),
});

export const { useGetOutletsQuery } = outletsApi;
