import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { serverRoutes } from "../Constants/serverRoutes";
import {
  updateApplicationToken,
  updateUserToken,
  userData,
} from "../Redux/Reducers/UserReducer";
import { toast } from "react-toastify";
import browserRoute from "../Constants/browserRoutes";

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

      toast.error("User Doesn't exist", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
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
      console.log("hey khizer error===", error);
      dispatch(userRegisteringFailed());
      toast.error("Something went wrong", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
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
  //   localStorage.removeItem("NoOfRecordInTable");
  //   window.localStorage.setItem("logged_in", false);
  // setUserToken("");

  // history.push("/");
  window.location.href = browserRoute?.LOGIN;
};
