import { apiSlice } from "../../api/sliceApi";

export const overallViewApiSlice = apiSlice.injectEndpoints({
  tagTypes: ["overallView", "AllianceMember"],
  endpoints: (builder) => ({
    addOverallView: builder.mutation({
      query: (overall_view) => ({
        url: "/overall_view",
        method: "POST",
        body: overall_view,
      }),
   
      
      invalidatesTags: ["overallView", "AllianceMember"],
    }),
    getOverallView: builder.query({
      query: (id) => ({
        url:`/pop/overall_view/${id}`,
        method: "GET",
      
      }),
  
      invalidatesTags: ["PopConstituentProcess"],
    }),
    updateOverallView: builder.mutation({
      query: (overallview) => ({
        url: `/overall_view/${overallview.id}`,
        method: "PUT",
        body: overallview,
      }),
      invalidatesTags: (result, error, arg) => [
        "PopConstituentProcess",
        { type: "PopConstituentProcess", id: arg.id },
      ],
    }),
    
   
    
  }),
});

export const {useAddOverallViewMutation,  useGetOverallViewQuery, useUpdateOverallViewMutation} = overallViewApiSlice;
