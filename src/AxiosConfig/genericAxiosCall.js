import { encodeData } from "../components/common/Utils/utils";
import axios from "./axios";

const genericAxiosCall = (url, method, data, params) => {
  return axios({
    url: `${url}${params ? encodeData(params) : ""}`,
    method: method,
    data: data,
  });
};

export default genericAxiosCall;
