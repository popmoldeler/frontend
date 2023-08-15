import { apiSlice } from "../../api/sliceApi";

export const businessAllianceApiSlice = apiSlice.injectEndpoints({
  tagTypes: ["BusinessAlliance"],
  endpoints: (builder) => ({
    getBusinessAlliances: builder.query({
      query: (id) => `/business_alliance/${id}`,
      providesTags: ["BusinessAlliance"],
    }),
    getBusinessAlliancesPermissions: builder.query({
      query: (id) => `/business_alliance_permission/${id}`,
      // providesTags: ["BusinessAlliance"],
    }),
    getBusinessAlliancesPublic: builder.query({
      query: () => "/business_alliance_public",
    }),
    getBusinessAlliance: builder.query({
      query: (id2) => `/business_alliance/${id2}`,
      providesTags: ["BusinessAlliance"],
    }),
    getOwnBusinessAlliance: builder.query({
      query: (id) => `/business_alliance_own/${id}`,
      invalidatesTags: ["AllianceMember"],
    }),
    addBusinessAlliance: builder.mutation({
      query: (alliance) => ({
        url: "/business_alliance",
        method: "POST",
        body: alliance,
      }),
      invalidatesTags: ["BusinessAlliance"],
    }),
    updateBusinessAlliance: builder.mutation({
      query: (alliance) => ({
        url: `/business_alliance/${alliance.id}`,
        method: "PUT",
        body: alliance,
      }),
      invalidatesTags: (result, error, arg) => [
        "BusinessAlliance",
        {
          type: "BusinessAlliance",
          id: arg.id,
        },
      ],
    }),
    deleteBusinessAlliance: builder.mutation({
      query: (cnpj) => ({
        url: `/business_alliance/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["BusinessAlliance"],
    }),

    addInternalCollaboration: builder.mutation({
      query: (member) => ({
        url: "/internal_collaboration",
        method: "POST",
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
    addExternalCollaboration: builder.mutation({
      query: (member) => ({
        url: "/external_collaboration",
        method: "POST",
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
    addPermission: builder.mutation({
      query: (permission) => ({
        url: "/permission",
        method: "POST",
        body: permission,
      }),
    }),
    addPop: builder.mutation({
      query: (pops) => ({
        url: "/pop",
        method: "POST",
        body: pops,
      }),
      invalidatesTags: ["BusinessAlliance"],
    }),
    updatePop: builder.mutation({
      query: (pop) => ({
        url: `/pop/${pop.id}`,
        method: "PUT",
        body: pop,
      }),
      invalidatesTags: ["BusinessAlliance"],
    }),
    deletePop: builder.mutation({
      query: (pop) => ({
        url: `/pop/${pop.id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["BusinessAlliance"],
    }),
    addPopMission: builder.mutation({
      query: (pops) => ({
        url: "/popmission",
        method: "POST",
        body: pops,
      }),
      invalidatesTags: ["BusinessAlliance"],
    }),
    updatePopMission: builder.mutation({
      query: (pop) => ({
        url: `/popmission/${pop.id}`,
        method: "PUT",
        body: pop,
      }),

      invalidatesTags: ["BusinessAlliance"],
    }),
    deletePopMission: builder.mutation({
      query: (mission) => ({
        url: `/popmission/${mission.id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["BusinessAlliance"],
    }),
    addMissionProcess: builder.mutation({
      query: (member) => ({
        url: "/mission_process",
        method: "POST",
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
  useGetBusinessAlliancesQuery,
  useGetBusinessAlliancesPublicQuery,
  useGetBusinessAllianceQuery,
  useAddAllianceMemberMutation,
  useAddBusinessAllianceMutation,
  useUpdateBusinessAllianceMutation,
  useDeleteBusinessAllianceMutation,
  useAddInternalCollaborationMutation,
  useAddExternalCollaborationMutation,
  useAddPermissionMutation,
  useGetOwnBusinessAllianceQuery,
  useGetBusinessAlliancesPermissionsQuery,
  useAddPopMutation,
  useUpdatePopMutation,
  useUpdatePopMissionMutation,
  useDeletePopMissionMutation,
  useDeletePopMutation,
  useAddMissionProcessMutation,

  useAddPopMissionMutation,
} = businessAllianceApiSlice;
