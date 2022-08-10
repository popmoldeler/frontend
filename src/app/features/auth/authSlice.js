import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "login",
  initialState: { user: null, access_token: null, user_id: null },
  reducers: {
    setCredentials: (state, action) => {
      const { user, access_token, user_id } = action.payload;
      state.user = user;
      state.access_token = access_token;
      state.user_id = user_id;
    },
    logOut: (state, action) => {
      state.user = null;
      state.access_token = null;
      state.user_id = null;
    },
  },
});

export const { setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state) => state.auth.user;
export const selectCurrentToken = (state) => state.auth.access_token;
export const selectCurrentUserId = (state) => state.auth.user_id;
