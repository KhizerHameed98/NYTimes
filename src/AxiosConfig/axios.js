import axios from "axios";
import { toast } from "react-toastify";

import store from "../store/configStore";

import { SERVER_URL, serverRoutes } from "./../Constants/serverRoutes";

const instance = axios.create({
  baseURL: SERVER_URL,
  timeout: 120000, // Let's say you want to wait at least (120000 ms) == 2 minutes
  paramsSerializer: function (params) {
    return params;
  },
});

instance.interceptors.request.use((x) => {
  const { applicationToken, domainID, subscriptionID, userToken } =
    store.getState().pReducers.user;
  x.headers.Authorization = `Bearer ${userToken}`;
  x.headers["X-Version"] = "1.0";
  // x.headers[!domainID ? "verification-api" : "X-Domain"] = domainID;
  // x.headers["X-Subscription"] = subscriptionID;
  // x.headers["userToken"] = userToken;
  // x.headers["israr-ahmed"] = "israr-ahmed";
  // x.headers["Access-Control-Allow-Origin"] = "*";
  // x.headers["Access-Control-Allow-Credentials"] = "true";
  // x.headers["Content-Type"] = "application/json'";

  x.meta = x.meta || {};
  x.meta.requestStartedAt = new Date().getTime();
  return x;
});

instance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error?.response) {
      // console.log("error--->>", error?.response);

      if (error?.response?.status === 400 || error?.response?.status === 401) {
        // console.log("error_if--->>", error?.response?.status);
        // do nothing
      } else {
        // console.log("error_else--->>", error?.response?.status);
        toast.error(
          `${error?.response?.status} - ${error?.response?.statusText}`,
          {
            position: toast.POSITION.BOTTOM_RIGHT,
          }
        );
      }
    }

    // if (error?.response?.status === 401) {
    //   const isRememberChecked = store.getState().pReducers.user.rememberMe;
    //   if (
    //     typeof isRememberChecked !== "undefined" &&
    //     typeof isRememberChecked !== "object" &&
    //     isRememberChecked !== "false" &&
    //     isRememberChecked !== "null"
    //   ) {
    //     axios.get(serverRoutes.APPLICATION_TOKEN).then((res) => {
    //       const { data: response } = res;
    //       const { data } = response;
    //       const token = data.accessToken;
    //       store.dispatch(updateApplicationToken(token));
    //       setTimeout(() => {
    //         // window.location.reload();
    //       }, [800]);
    //     });
    //   } else {
    //     store.dispatch(updateApplicationToken(""));
    //     // window.location.href = "/login";
    //   }
    // }
    return Promise.reject(error);
  }
);
export default instance;
