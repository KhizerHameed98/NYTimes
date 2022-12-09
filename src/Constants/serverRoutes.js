export const SERVER_URL = process.env.REACT_APP_SERVERURL
  ? process.env.REACT_APP_SERVERURL
  : "http://localhost:8000";

export const serverRoutes = {
  SIGNIN: `${SERVER_URL}/auth/login`,
  SIGNUP: `${SERVER_URL}/auth/register`,
};
