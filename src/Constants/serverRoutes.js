export const SERVER_URL = process.env.REACT_APP_SERVERURL
  ? process.env.REACT_APP_SERVERURL
  : "http://localhost:8000";

export const serverRoutes = {
  SIGNIN: `${SERVER_URL}/auth/login`,
  SIGNUP: `${SERVER_URL}/auth/register`,
  GET_TOP_NEWS_HOME: "https://api.nytimes.com/svc/topstories/v2/home.json",
  GET_TOP_NEWS_SCIENCE:
    "https://api.nytimes.com/svc/topstories/v2/science.json",
  GET_TOP_NEWS_WORLD: "https://api.nytimes.com/svc/topstories/v2/world.json",
  GET_ARTICLE_SEARCH:
    "https://api.nytimes.com/svc/search/v2/articlesearch.json",
  IMAGE_LINK: "https://static01.nyt.com",
};
export const API_KEY = process.env.REACT_APP_API_KEY
  ? process.env.REACT_APP_API_KEY
  : "ncz2cdAWX9gKfv3ER17403MkLeoGhmAq";
