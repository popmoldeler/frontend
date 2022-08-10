import { apiSlice } from "../../api/sliceApi";

export const externalCollaborationApiSlice = apiSlice.injectEndpoints({
  tagTypes: ["BusinessAlliance"],
  endpoints: (builder) => ({
    addExternalCollaboration: builder.mutation({
      query: (member) => ({
        url: "/external_collaboration",
        method: "POST",
        body: member,
      }),
      invalidatesTags: ["BusinessAlliance"],
    }),
    updateExternalCollaboration: builder.mutation({
      query: (member) => ({
        url: `/external_collaboration/${member.id}`,
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
  useUpdateExternalCollaborationMutation,
  useAddExternalCollaborationMutation,
} = externalCollaborationApiSlice;
