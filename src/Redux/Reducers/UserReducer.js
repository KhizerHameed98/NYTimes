import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  userToken: "",
  email: "",
  password: "",
  searchHistory: [],
};
const searchLimit = 5;
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
    logouttoInitial(state, action) {
      return { ...state, userToken: "", searchHistory: [] };
    },

    updateSearchHistory(state, action) {
      const { query, currentState } = action.payload;
      const { searchHistory } = currentState;
      if (query && !searchHistory?.includes(query)) {
        let arr = [];
        let tempArr = [...searchHistory];
        if (tempArr?.length >= searchLimit) {
          tempArr.shift();
          tempArr.push(query.toString());
          arr = tempArr;
        } else if (tempArr?.length > 0 && tempArr?.length < searchLimit) {
          tempArr.push(query.toString());
          arr = tempArr;
        } else {
          arr.push(query.toString());
        }
        return { ...state, searchHistory: arr };
      }
    },
  },
});

export const {
  updateApplicationToken,
  userData,
  updateUserName,
  updateLoginUserData,
  updateUserToken,
  logouttoInitial,
  updateSearchHistory,
} = UserReducer.actions;
export default UserReducer.reducer;
