import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    authUser: null,
    otherUser: null,
    selectedUser: null,
  },
  reducers: {
    setAuthUser: (state, action) => {
      state.authUser = action.payload;
    },
    setOtherUser: (state, action) => {
      state.otherUser = action.payload;
    },
    setSelecterdUser: (state, action) => {
      state.selectedUser = action.payload;
    },
  },
});
export const { setAuthUser, setOtherUser, setSelecterdUser } =
  userSlice.actions;
export default userSlice.reducer;
