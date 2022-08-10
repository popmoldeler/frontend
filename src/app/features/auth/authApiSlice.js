import { apiSlice } from "../../api/sliceApi";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/signin",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["User"],
    }),
    signUp: builder.mutation({
      query: (credentials) => ({
        url: "/signup",
        method: "POST",
        body: credentials,
      }),
    }),
    forgotPassword: builder.mutation({
      query: (email) => ({
        url: "send_email",
        method: "POST",
        body: email,
      }),
      invalidatesTags: ["User"],
    }),
    resetPassword: builder.mutation({
      query: (email) => ({
        url: "resetPassword",
        method: "POST",
        body: email,
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useLoginMutation,
  useSignUpMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
} = authApiSlice;
