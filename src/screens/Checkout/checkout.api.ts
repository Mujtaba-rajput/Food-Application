import { baseQuery } from "../../lib/baseQuery";
import { createApi } from "@reduxjs/toolkit/query/react";

export const checkoutApi = createApi({
  baseQuery: baseQuery,
  reducerPath: "checkout/api",
  endpoints: (build) => ({
    createOrder: build.mutation({
      query(body) {
        return {
          url: `/orders`,
          method: "POST",
          body,
        };
      },
    }),
    validateDiscount: build.mutation({
      query(body) {
        return {
          url: `/discount/validate-discount`,
          method: "POST",
          body,
        };
      },
    }),
    getPointsConversion: build.query({
      query() {
        return {
          url: `/points-redemption-setup`,
          method: "GET",
        };
      },
    }),
    checkPointsValidation: build.query({
      query(body) {
        return {
          url: `/check-redemption-validity/${body.id}/${body.points}`,
          method: "GET",
        };
      },
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useValidateDiscountMutation,
  useLazyGetPointsConversionQuery,
  useLazyCheckPointsValidationQuery,
} = checkoutApi;
