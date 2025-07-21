import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const apiBaseUrl = "https://api.nines.com";
// const apiBaseUrl = "https://ae79-119-155-6-205.ngrok-free.app";

// Create an API slice
export const api = createApi({
  reducerPath: "api",
  tagTypes: ["Users"],
  baseQuery: fetchBaseQuery({
    baseUrl: apiBaseUrl,
    prepareHeaders: async (headers, { getState }: any) => {
      const token = getState()?.auth?.token;

      if (token) {
        headers.set("Authorization", ` Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: (credentials) => ({
        url: "/api/login",
        method: "POST",
        body: credentials,
      }),
    }),
  }),
});

// Export the API endpoints
export const { useLoginUserMutation } = api;

export default api;
