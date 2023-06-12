import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';

export const otpApi = createApi({
  reducerPath: 'otp/api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://app.getsub.com.pk',
    headers: {
      token: 'cb160082-cf07-46f9-8e92-f9772c057c58',
      hq_company_token: 'cb160082-cf07-46f9-8e92-f9772c057c58',
    },
  }),

  endpoints: build => ({
    verifyOtp: build.query({
      query: body => ({
        url: '/api/v1/auth/verify_code',
        method: 'POST',
        body: body,
      }),
    }),
    resendOtp: build.query({
      query: params => ({
        url: '/api/v1/auth/resend_code',
        method: 'POST',
        params: params,
      }),
    }),
  }),
});

export const { useVerifyOtpQuery, useResendOtpQuery } = otpApi;
