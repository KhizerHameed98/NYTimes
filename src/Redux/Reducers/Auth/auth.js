import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { logouttoInitial, updateUserToken, userData } from "../UserReducer";

import { toast } from "react-toastify";
import { serverRoutes } from "../../../Constants/serverRoutes";
import browserRoute from "../../../Constants/browserRoutes";
import { handleError } from "../../../middlewares/errorHandler";
import {
  decodePassword,
  encodePassword,
} from "../../../components/Common/Utils";

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
    url: serverRoutes?.SIGNIN,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },

    data: data,
  })
    .then((res) => {
      let obj = {
        userToken: res?.data?.access_token,
        email: data?.email,
        password: encodePassword(data?.password),
      };

      dispatch(userData(obj));

      dispatch(loginReceived());
      toast.success("Logged In Successfully", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    })
    .catch((error) => {
      dispatch(loginFailed());
      handleError(error, "Something went wrong");
    });
};

export const registerRequest = (data) => (dispatch) => {
  dispatch(userRegisteringRequest());

  axios({
    url: serverRoutes?.SIGNUP,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },

    data: data,
  })
    .then((res) => {
      let obj = {
        userToken: res?.data?.access_token,
        email: data?.email,
        password: encodePassword(data?.password),
      };
      dispatch(userData(obj));
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
  dispatch(updateUserToken(""));
  dispatch(logouttoInitial());

  // just for track user history
  // saveLogForLogActivity("Successfully logged out...");

  window.localStorage.removeItem("persist:root");
  window.localStorage.removeItem("userToken");
  window.localStorage.removeItem("userTokenExpiry");

  window.location.href = browserRoute?.LOGIN;
};

const refreshToken = (user) => {
  setInterval(function () {
    getToken(user);
  }, 3000);
};

const getToken = (user) => {
  const data = { email: user.email, password: decodePassword(user.password) };
  // axios({
  //   url: serverRoutes?.SIGNIN,
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //     "Access-Control-Allow-Origin": "*",
  //   },

  //   data: data,
  // })
  //   .then((res) => {})
  //   .catch((error) => {});
};
