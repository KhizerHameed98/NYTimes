import axios from "axios";
import { decodePassword } from "../components/Common/Utils";
import { serverRoutes } from "../Constants/serverRoutes";
import { updateApplicationToken } from "../Redux/Reducers/UserReducer";
import store from "../Redux/store/configStore";

export const getUser = () => {
  return store.getState().pReducers.user;
};
export const refreshToken = () => {
  const { email, password } = store.getState().pReducers.user;
  const data = { email: email, password: decodePassword(password) };
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
      if (res?.status === 200) {
        const applicationToken = res?.data?.access_token;
        store.dispatch(updateApplicationToken(applicationToken));
      }
    })
    .catch((err) => {
      return;
    });
};
