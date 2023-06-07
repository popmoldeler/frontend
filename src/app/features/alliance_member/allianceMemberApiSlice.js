import { apiSlice } from "../../api/sliceApi";

export const allianceMemberApiSlice = apiSlice.injectEndpoints({
  tagTypes: ["AllianceMember","BusinessAlliance"],
  endpoints: (builder) => ({
    getAllianceMember: builder.query({
      query: () => "/alliance_member",

      providesTags: ["AllianceMember"],
    }),
    addAllianceMember: builder.mutation({
      query: (member) => ({
        url: "/alliance_member",
        method: "POST",
        body: member,
      }),
      invalidatesTags: (result, error, arg) => [
        "AllianceMember",
        { type: "AllianceMember", id: arg },
      ],
    }),
    updateAllianceMember: builder.mutation({
      query: (member) => ({
        url: `/alliance_member/${member.id}`,
        method: "PUT",
        body: member.member,
      }),
      invalidatesTags: (result, error, arg) => [
        "AllianceMember",
        { type: "AllianceMember", id: arg.id },
      ],
    }),
    deleteAllianceMember: builder.mutation({
      query: (id) => ({
        url: `/alliance_member/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["AllianceMember"],
    }),
    addBusinessProcessModel: builder.mutation({
      query: (constituent_process) => ({
        url: "/constituent_process",
        method: "POST",
        body: constituent_process,
      }),
      invalidatesTags: ["AllianceMember"],
    }),
    deleteBusinessProcessModel: builder.mutation({
      query: (id) => ({
        url: `/constituent_process/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["AllianceMember"],
    }),
    updateBusinessProcessModel: builder.mutation({
      query: (process) => ({
        url: `/constituent_process/${process.id}`,
        method: "PUT",
        body: process,
      }),
      invalidatesTags: ["AllianceMember"],
    }),
  }),
});

export const {
  useGetAllianceMemberQuery,
  useAddAllianceMemberMutation,
  useUpdateAllianceMemberMutation,
  useDeleteAllianceMemberMutation,
  useAddBusinessProcessModelMutation,
  useDeleteBusinessProcessModelMutation,
  useUpdateBusinessProcessModelMutation,

} = allianceMemberApiSlice;
