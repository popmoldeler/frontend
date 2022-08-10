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
  }),
});

export const { useAddConstituentProcessMutation } = constituentProcessApiSlice;
