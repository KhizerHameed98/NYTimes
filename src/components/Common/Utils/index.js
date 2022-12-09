import { API_KEY } from "../../../Constants/serverRoutes";

export const encodeData = (data) => {
  let c = Object.keys(data)
    .map(function (key) {
      return [key, data[key]].map(encodeURIComponent).join("=");
    })
    .join("&");
  if (c) {
    c = c + `&api-key=${API_KEY}`;
  } else {
    c = `api-key=${API_KEY}`;
  }
  return c;
};