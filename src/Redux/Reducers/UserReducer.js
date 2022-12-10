import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  userToken: "",
};

export const UserReducer = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateApplicationToken(state, action) {
      return { ...state, applicationToken: action.payload };
    },

    userData(state, action) {
      const { payload } = action;
      state = {
        ...state,
        userToken: payload,
      };
      window.localStorage.setItem("userToken", payload);
      return state;
    },

    updateUserName(state, action) {
      return { ...state, userName: action.payload };
    },

    updateLoginUserData(state, action) {
      return { ...state, loginUserData: action.payload };
    },
    updateUserToken(state, action) {
      return { ...state, userToken: action.payload };
    },
  },
});

export const {
  updateApplicationToken,
  userData,
  updateUserName,
  updateLoginUserData,
  updateUserToken,
} = UserReducer.actions;
export default UserReducer.reducer;
