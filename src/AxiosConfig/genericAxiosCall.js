import { encodeData } from "../components/Common/Utils";
import axios from "./axios";

const genericAxiosCall = (url, method, data, params) => {
  return axios({
    url: `${url}?${encodeData(params)}`,
    method: method,
    data: data,
  });
};

export default genericAxiosCall;
