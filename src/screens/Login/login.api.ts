import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { baseQuery } from "../../lib/baseQuery";

export const loginApi = createApi({
  baseQuery: baseQuery,
  reducerPath: "login/api",
  endpoints: (build) => ({
    login: build.mutation({
      query(body) {
        return {
          url: `/auth/login`,
          method: "POST",
          body,
        };
      },
    }),
    signUp: build.mutation({
      query(body) {
        return {
          url: `/auth/signup`,
          method: "POST",
          body,
        };
      },
    }),
    sendOtp: build.query({
      query(body) {
        return {
          url: `/auth/send-otp?phoneNumber=${body}`,
          method: "GET",
        };
      },
    }),
    verifyOtp: build.query({
      query({
        phoneNumber,
        otp,
      }: {
        phoneNumber: string;
        otp: string | number;
      }) {
        return {
          url: `/auth/verify-otp?phoneNumber=${phoneNumber}&otp=${otp}`,
          method: "GET",
        };
      },
    }),
    guestSignUp: build.mutation({
      query(body) {
        return {
          url: `/auth/guest-signup`,
          method: "POST",
          body,
        };
      },
    }),
    getUser: build.query({
      query() {
        return {
          url: `/auth/get-customer-by-token`,
          method: "GET",
        };
      },
    }),
    getCustomerPointsHistory: build.query({
      query(id) {
        return {
          url: `/get-customer-points-history/${id}`,
          method: "GET",
        };
      },
    }),
    addAddress: build.mutation({
      query(body) {
        return {
          url: `/address/create`,
          method: "POST",
          body,
        };
      },
    }),
    getAddress: build.query({
      query(body) {
        return {
          url: `/address/by-customer-id/${body}`,
          method: "GET",
        };
      },
    }),
  }),
});

export const {
  useLoginMutation,
  useSignUpMutation,
  useLazyVerifyOtpQuery,
  useLazySendOtpQuery,
  useGuestSignUpMutation,
  useLazyGetUserQuery,
  useGetCustomerPointsHistoryQuery,
  useAddAddressMutation,
  useGetAddressQuery,
} = loginApi;
