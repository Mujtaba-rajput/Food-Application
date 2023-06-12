import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';

export const signupApi = createApi({
  reducerPath: 'signup/api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://app.getsub.com.pk',
    headers: {
      token: 'cb160082-cf07-46f9-8e92-f9772c057c58',
      hq_company_token: 'cb160082-cf07-46f9-8e92-f9772c057c58',
    },
  }),

  endpoints: build => ({
    signup: build.query({
      query: body => ({
        url: '/api/v1/auth/signup',
        method: 'POST',
        body: body,
      }),
    }),
  }),
});

export const { useSignupQuery } = signupApi;
