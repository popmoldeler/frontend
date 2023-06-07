import { apiSlice } from "../../api/sliceApi";

export const PopMissionDetailedModelApiSlice = apiSlice.injectEndpoints({
  tagTypes: ["PopMissionDetailedModel", "BusinessAlliance","AllianceMember"],
  endpoints: (builder) => ({
    addPopMissionDetailedModel: builder.mutation({
      query: (popMissionDetailedModel) => ({
        url: "/popMissionDetailedModel",
        method: "POST",
        body: popMissionDetailedModel,
      }),

      invalidatesTags: ["PopMissionDetailedModel", "BusinessAlliance","AllianceMember"],
    }),
    getPopMissionDetailedModel: builder.query({
      query: (id) => ({
        url: `/pop/popMissionDetailedModel/${id}`,
        method: "GET",
      }),

      invalidatesTags: ["PopConstituentProcess"],
    }),
    updatePopMissionDetailedModel: builder.mutation({
      query: (popMissionDetailedModel) => ({
        url: `/popMissionDetailedModel/${popMissionDetailedModel.id}`,
        method: "PUT",
        body: popMissionDetailedModel,
      }),
      invalidatesTags: (result, error, arg) => [
        "PopConstituentProcess", "BusinessAlliance","AllianceMember",
        { type: "PopConstituentProcess", id: arg.id },
      ],
    }),
  }),
});

export const {
  useAddPopMissionDetailedModelMutation,
  useGetPopMissionDetailedModelQuery,
  useUpdatePopMissionDetailedModelMutation,
} = PopMissionDetailedModelApiSlice;
