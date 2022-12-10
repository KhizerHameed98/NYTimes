import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {
  updateApplicationToken,
  updateUserToken,
  userData,
} from "../Reducers/UserReducer";

import { toast } from "react-toastify";
import { serverRoutes } from "../../Constants/serverRoutes";
import browserRoute from "../../Constants/browserRoutes";
import { handleError } from "../../middlewares/errorHandler";

//////////////////////////////////////////////////////////////
//                      Reducers
//////////////////////////////////////////////////////////////

const slice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    isAuthenticated: false,
    res: null,
    error: null,
    loadError: null,
    updateProfile: false,
    cPassLoading: false,
    cPassError: null,
    isChangedPass: false,

    fPassLoading: false,
    fPassError: null,
    isURLSent: false,
    message: "",

    nPassLoading: false,
    nPassError: null,
    isPasUpdated: false,
    nPMessage: "",
  },
  reducers: {
    loginRequested: (auth, action) => {
      auth.loading = true;
    },
    loginReceived: (auth, action) => {
      auth.loading = false;
      auth.isAuthenticated = true;
    },
    loginFailed: (auth, action) => {
      auth.loading = false;
      auth.error = action.payload;
    },
    userRegisteringRequest: (auth, action) => {
      auth.error = null;
      auth.loading = true;
    },
    userRegistered: (auth, action) => {
      auth.loading = false;
      auth.isAuthenticated = true;
    },
    userRegisteringFailed: (auth, action) => {
      auth.loading = false;
      auth.error = action.payload;
    },
  },
});
export default slice.reducer;
const {
  loginReceived,
  loginRequested,
  loginFailed,
  userRegistered,
  userRegisteringFailed,
  userRegisteringRequest,
} = slice.actions;

/////////////////////////////////////////////////////////////////////
//                      Actions
/////////////////////////////////////////////////////////////////////
export const loginRequest = (data) => (dispatch) => {
  dispatch(loginRequested());

  axios({
    // Endpoint to send files
    url: serverRoutes?.SIGNIN,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },

    data: data,
  })
    .then((res) => {
      dispatch(userData(res?.data?.access_token));
      dispatch(loginReceived());
      toast.success("Logged In Successfully", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    })
    .catch((error) => {
      dispatch(loginFailed());
      handleError(error, "User doesn't exist");
    });
};

export const registerRequest = (data) => (dispatch) => {
  dispatch(userRegisteringRequest());

  axios({
    // Endpoint to send files
    url: serverRoutes?.SIGNUP,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },

    data: data,
  })
    .then((res) => {
      dispatch(userData(res?.data?.access_token));
      dispatch(userRegistered());
      toast.success("Registered Successfully", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    })
    .catch((error) => {
      dispatch(userRegisteringFailed());
      handleError(error, "Something went wrong");
    });
};

export const logoutUserRequest = () => (dispatch) => {
  // window.localStorage.clear();
  // console.log("Logout_func--->>");

  dispatch(updateApplicationToken(""));
  dispatch(updateUserToken(""));

  // just for track user history
  // saveLogForLogActivity("Successfully logged out...");

  window.localStorage.removeItem("persist:root");
  window.localStorage.removeItem("userToken");

  //   localStorage.removeItem("NoOfRecordInTable");
  //   window.localStorage.setItem("logged_in", false);
  // setUserToken("");

  // history.push("/");
  window.location.href = browserRoute?.LOGIN;
};
