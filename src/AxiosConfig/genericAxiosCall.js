import { encodeData, encodeData2 } from "../components/Common/Utils";
import axios from "./axios";

const genericAxiosCall = (url, method, data, params) => {
  return axios({
    url: `${url}${encodeData2(params)}`,
    method: method,
    data: data,
  });
};

export default genericAxiosCall;
