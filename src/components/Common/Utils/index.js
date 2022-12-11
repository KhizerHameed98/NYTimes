import { API_KEY } from "../../../Constants/serverRoutes";
var CryptoJS = require("crypto-js");
const key = "NYTime123";
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

export const encodePassword = (password) => {
  var ciphertext = CryptoJS.AES.encrypt(
    JSON.stringify(password),
    key
  ).toString();
  return ciphertext;
};
export const decodePassword = (password) => {
  var bytes = CryptoJS.AES.decrypt(password, key);
  var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  return decryptedData;
};
