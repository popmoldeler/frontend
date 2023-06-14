import { apiSlice } from "../../api/sliceApi";

export const PopMissionModelApiSlice = apiSlice.injectEndpoints({
  tagTypes: ["PopMissionModel", "BusinessAlliance","AllianceMember"],
  endpoints: (builder) => ({
    addPopMissionModel: builder.mutation({
      query: (overall_view) => ({
        url: "/popMissionModel",
        method: "POST",
        body: overall_view,
      }),

      invalidatesTags: ["PopMissionModel", "BusinessAlliance","AllianceMember"],
    }),
    getPopMissionModel: builder.query({
      query: (id) => ({
        url: `/pop/popMissionModel/${id}`,
        method: "GET",
      }),

      invalidatesTags: ["PopConstituentProcess"],
    }),
    updatePopMissionModel: builder.mutation({
      query: (PopMissionModel) => ({
        url: `/popMissionModel/${PopMissionModel.id}`,
        method: "PUT",
        body: PopMissionModel,
      }),
      invalidatesTags: (result, error, arg) => [
        "PopConstituentProcess", "BusinessAlliance","AllianceMember",
        { type: "PopConstituentProcess", id: arg.id },
      ],
    }),
  }),
});

export const {
  useAddPopMissionModelMutation,
  useGetPopMissionModelQuery,
  useUpdatePopMissionModelMutation,
} = PopMissionModelApiSlice;
