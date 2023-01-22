import { encodeData } from "../components/Common/Utils";
import axios from "./axios";
import { refreshToken } from "./helper";

const checkTokenExpiry = () => {
  const tokenExpiry = new Date(localStorage.getItem("userTokenExpiry"));
  if (new Date().getTime() >= tokenExpiry.getTime()) {
    refreshToken();
  }
};
const genericAxiosCall = async (url, method, data, params) => {
  await checkTokenExpiry();
  return axios({
    url: `${url}?${encodeData(params)}`,
    method: method,
    data: data,
  });
};

export default genericAxiosCall;
