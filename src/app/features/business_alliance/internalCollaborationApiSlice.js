import { apiSlice } from "../../api/sliceApi";

export const internalCollaborationApiSlice = apiSlice.injectEndpoints({
  tagTypes: ["BusinessAlliance"],
  endpoints: (builder) => ({
    addInternalCollaboration: builder.mutation({
        query: (member) => ({
          url: "/internal_collaboration",
          method: "POST",
          body: member
        }),
        invalidatesTags: ["BusinessAlliance"]
      }),
    updateInternalCollaboration: builder.mutation({
      query: (member) => ({
        url: `/internal_collaboration/${member.id}`,
        method: "PUT",
        body: member,
      }),
      invalidatesTags: (result, error, arg) => [
        "BusinessAlliance",
        {
          type: "BusinessAlliance",
          id: arg.id,
        },
      ],
    }),
  }),
});

export const {
  useUpdateInternalCollaborationMutation,
  useAddInternalCollaborationMutation,


} = internalCollaborationApiSlice;
