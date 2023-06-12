import { fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { getStorageData } from "../service/asyncStorage";

// const API_BASE_URL = "https://wla.myway.techverxcloud.com/api";

const API_BASE_URL = "https://hq.myway.techverxcloud.com/api";

export const baseQuery = fetchBaseQuery({
  baseUrl: API_BASE_URL,
  prepareHeaders: async (headers) => {
    const data = await getStorageData("token");
    if (data) {
      headers.set("Authorization", `Bearer ${data}`);
    }
    return headers;
  },
});
