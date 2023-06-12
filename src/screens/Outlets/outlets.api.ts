import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { baseQuery } from "../../lib/baseQuery";

// export const outletsApi = createApi({
//   reducerPath: "outlets/api",
//   baseQuery: fetchBaseQuery({
//     baseUrl: "https://hq.fridaypos.com",
//     headers: {
//       "Content-Type": "application/json",
//       "Accept-Encoding": "gzip, deflate,br",
//       Accept: "*/*",
//       token: "a29203e28e4ceee5bf59edad60ea4efb",
//     },
//   }),

//   endpoints: (build) => ({
//     getOutlets: build.query({
//       query: (params: any) => ({
//         url: "/new_api/companies/get_stores_locations?city=Lahore",
//         method: "Get",
//         params: params,
//       }),
//     }),
//   }),
// });

// export const { useGetOutletsQuery } = outletsApi;

export const outletsApi = createApi({
  baseQuery: baseQuery,
  reducerPath: "outlets/api",
  // extractRehydrationInfo(action, { reducerPath }) {
  //   // if (action.type === HYDRATE) {
  //   //   return action.payload[reducerPath];
  //   // }
  // },
  tagTypes: [],
  endpoints: (build) => ({
    fetchMenu: build.query({
      query: () => {
        return {
          url: "get-all-categories",
          method: "GET",
        };
      },
    }),
    getCities: build.query({
      query: () => {
        return {
          url: "/get-cities",
          method: "GET",
        };
      },
    }),
    getAreas: build.query({
      query: (id) => {
        return {
          url: `/get-areas-by-cityId/${id}`,
          method: "GET",
        };
      },
    }),
    getStores: build.query({
      query: ({ cityId, areaId }) => {
        return {
          url: `/get-store-by-cityId-areaId/${cityId}/${areaId}`,
          method: "GET",
        };
      },
    }),
    // getStores: build.query({
    //   query: ({ cityId, areaId }) => {
    //     return {
    //       url: `/get-store-delivery-areas-by-store-and-city-id/${cityId}/${areaId}`,
    //       method: 'GET',
    //     };
    //   },
    // }),
    getStoresByCity: build.query({
      query: (id) => {
        return {
          url: `/get-all-store-by-city-id/${id}`,
          method: "GET",
        };
      },
    }),
    getAllStores: build.query({
      query: () => {
        return {
          url: "/get-all-stores",
          method: "GET",
        };
      },
    }),
    getStoreById: build.query({
      query: (body) => {
        return {
          url: `/get-store-by-id/${body}`,
          method: "GET",
        };
      },
    }),
  }),
});

// Export hooks for usage in functional components
export const {
  useFetchMenuQuery,
  useGetCitiesQuery,
  useLazyGetAreasQuery,
  useLazyGetStoresQuery,
  useGetStoresQuery,
  useLazyGetStoresByCityQuery,
  useGetStoresByCityQuery,
  useGetAllStoresQuery,
  useLazyGetStoreByIdQuery,
  util: { getRunningQueriesThunk },
} = outletsApi;

// export endpoints for use in SSR
export const { fetchMenu, getCities } = outletsApi.endpoints;
