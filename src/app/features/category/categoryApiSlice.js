import { apiSlice } from "../../api/sliceApi";

export const categoryApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCategory: builder.query({
      query: () => "/category",
      keepUnusedDataFor: 5,
    }),
  }),
});

export const { useGetCategoryQuery } = categoryApiSlice;
