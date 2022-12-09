import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import genericAxiosCall from "../../../AxiosConfig/genericAxiosCall";
import { serverRoutes } from "../../../Constants/serverRoutes";

export const Dashboard = createSlice({
  name: "dashboard",
  initialState: {
    newsList: [],
    loading: false,
  },
  reducers: {
    setNews: (state, action) => {
      state.newsList = action.payload;
    },
  },
});

export const { dashboardAction } = Dashboard.actions;

export const getTopNews = () => async (dispatch) => {
  // genericAxiosCall(serverRoutes?.GET_TOP_NEWS, "get", "", "");
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImtoenJoYW1lZWQ5OEBnbWFpbC5jb20iLCJwYXNzd29yZCI6IlF3ZXJ0eXNmXzEyMyIsImlhdCI6MTY3MDU4NDA1MSwiZXhwIjoxNjcwNTg3NjUxfQ.6pUiIzftnJixsYeEj7r-1rbbZCpv_dPRJrLKQoF1CDA";
  // axios({
  //   // Endpoint to send files
  //   url: `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=&page=1&api-key=ncz2cdAWX9gKfv3ER17403MkLeoGhmAq`,
  //   method: "GET",
  //   headers: {
  //     "Content-Type": "application/json",
  //     "Access-Control-Allow-Origin": "*",
  //   },
  // });
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  axios.get(`http://localhost:8000/register`, {
    email: "asjdadsjal",
    password: "sajndasjjd",
  });
  const newsList = "";
};

export default Dashboard.reducer;
