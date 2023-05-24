import { apiSlice } from "../../api/sliceApi";

export const constituentProcessApiSlice = apiSlice.injectEndpoints({
  tagTypes: ["constituent_process", "AllianceMember"],

  endpoints: (builder) => ({
    addConstituentProcess: builder.mutation({
      query: (constituent_process) => ({
        url: "/constituent_process",
        method: "POST",
        body: constituent_process,
      }),


      invalidatesTags: ["constituent_process", "AllianceMember"],
    }),

    getPop: builder.mutation({
      query: (fileName) => ({
        url: `/pop/${fileName}`,
        method: "GET",

      }),

      invalidatesTags: ["AllianceMember"],
    }),
    getPoPConstituentProcess: builder.query({
      query: (id) => ({
        url: `/constituent_process/${id}`,
        method: "GET",

      }),

      invalidatesTags: ["PopConstituentProcess"],
    }),
  }),
});

export const { useAddConstituentProcessMutation, useGetPopMutation, useGetPoPConstituentProcessQuery } = constituentProcessApiSlice;
