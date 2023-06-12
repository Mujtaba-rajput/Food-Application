import { createApi } from "@reduxjs/toolkit/dist/query/react";
import { baseQuery } from "../../lib/baseQuery";

export const homeApi = createApi({
  baseQuery: baseQuery,
  reducerPath: "home/api",
  tagTypes: [],
  endpoints: (build) => ({
    fetchProdByCat: build.query({
      query: (categoryId: string) => {
        return {
          url: `/get-products-by-category-id/${categoryId}`,
          method: "GET",
        };
      },
    }),
    fetchCategoryById: build.query({
      query: (categoryId: string) => {
        return {
          url: `/get-category-id/${categoryId}`,
          method: "GET",
        };
      },
    }),
    fetchProductById: build.query({
      query: (productId: string) => {
        return {
          url: `/get-product-by-id/${productId}`,
          method: "GET",
        };
      },
    }),
    getOrderHistory: build.query({
      query(body) {
        return {
          url: `/get-orders-by-customer-id/${body.id}/${body.orderState}?page=${body.page}`,
          method: "GET",
        };
      },
      // providesTags: ["orders-list"],
    }),
    fetchFeatureProducts: build.query({
      query: (id) => {
        return {
          url: `/get-all-featured-products/${id}`,
          method: "GET",
        };
      },
    }),
    fetchDealById: build.query({
      query: (dealId: string) => {
        return {
          url: `/get-deal-by-id/${dealId}`,
          method: "GET",
        };
      },
    }),
    fetchStoreCategoryProducts: build.query({
      query: (body) => {
        return {
          url: `/get-products-by-category-store-id/${body.categoryId}/${body.storeId}`,
          method: "GET",
        };
      },
    }),
  }),
});

// Export hooks for usage in functional components
export const {
  useFetchProdByCatQuery,
  useFetchCategoryByIdQuery,
  useFetchProductByIdQuery,
  useGetOrderHistoryQuery,
  useFetchFeatureProductsQuery,
  useFetchDealByIdQuery,
  useFetchStoreCategoryProductsQuery,
  util: { getRunningQueriesThunk },
  useLazyGetOrderHistoryQuery,
} = homeApi;

// export endpoints for use in SSR
export const { fetchProdByCat, fetchCategoryById, fetchProductById } =
  homeApi.endpoints;
