import { apiSlice } from "../../api/sliceApi";

export const overallViewApiSlice = apiSlice.injectEndpoints({
  tagTypes: ["BusinessAlliance"],
  endpoints: (builder) => ({
    addOverallView: builder.mutation({
      query: (overall_view) => ({
        url: "/overall_view",
        method: "POST",
        body: overall_view,
      }),
   
      
      invalidatesTags: ["BusinessAlliance"],
    }),
    getOverallView: builder.query({
      query: (id) => ({
        url:`/pop/overall_view/${id}`,
        method: "GET",
      
      }),
  
      invalidatesTags: ["overallView"],
    }),
    updateOverallView: builder.mutation({
      query: (overallview) => ({
        url: `/overall_view/${overallview.id}`,
        method: "PUT",
        body: overallview,
      }),
      invalidatesTags:  [
         "BusinessAlliance",
      ],
    }),
    
   
    
  }),
});

export const {useAddOverallViewMutation,  useGetOverallViewQuery, useUpdateOverallViewMutation} = overallViewApiSlice;
