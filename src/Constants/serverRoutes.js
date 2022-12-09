export const SERVER_URL = process.env.REACT_APP_SERVERURL
  ? process.env.REACT_APP_SERVERURL
  : "http://localhost:8000";

export const serverRoutes = {
  SIGNIN: `${SERVER_URL}/auth/login`,
  SIGNUP: `${SERVER_URL}/auth/register`,
  GET_TOP_NEWS: "https://api.nytimes.com/svc/topstories/v2/home.json",
};
export const API_KEY = process.env.REACT_APP_API_KEY
  ? process.env.REACT_APP_API_KEY
  : "ncz2cdAWX9gKfv3ER17403MkLeoGhmAq";
