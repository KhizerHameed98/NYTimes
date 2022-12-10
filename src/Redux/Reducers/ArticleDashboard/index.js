import { createSlice } from "@reduxjs/toolkit";
import genericAxiosCall from "../../../AxiosConfig/genericAxiosCall";
import { serverRoutes } from "../../../Constants/serverRoutes";
import { handleError } from "../../../middlewares/errorHandler";
// import { serverRoutes } from "../../../Constants/serverRoutes";
// import { handleError } from "../../../middlewares/errorHandler";
//////////////////////////////////////////////////////////////
//                      Reducers
//////////////////////////////////////////////////////////////

const slice = createSlice({
  name: "articles",
  initialState: {
    loading: false,
    newsList: null,
    listByState: "All",
  },
  reducers: {
    gettingNewsRequested: (state, action) => {
      state.loading = true;
    },
    gettingNewsSuccess: (state, action) => {
      state.newsList = action.payload;
      state.listByState = action.payload.listByState;
      state.loading = false;
    },
    gettingNewsFailed: (state, action) => {
      state.loading = false;
    },
  },
});
export default slice.reducer;
const { gettingNewsRequested, gettingNewsSuccess, gettingNewsFailed } =
  slice.actions;

/////////////////////////////////////////////////////////////////////
//                      Actions
/////////////////////////////////////////////////////////////////////
export const getTopNews = (listBy) => (dispatch, getState) => {
  let url;
  switch (listBy) {
    case "All":
      url = serverRoutes?.GET_TOP_NEWS_HOME;
      break;
    case "World":
      url = serverRoutes?.GET_TOP_NEWS_WORLD;
      break;
    case "Science":
      url = serverRoutes?.GET_TOP_NEWS_SCIENCE;
      break;
    default:
      break;
  }
  dispatch(gettingNewsRequested());

  genericAxiosCall(url ? url : serverRoutes?.GET_TOP_NEWS_HOME, "get", "", "")
    .then((res) => {
      if (res.data.status) {
        let data = res.data.results;
        data.listByState = listBy;
        dispatch(gettingNewsSuccess(data));
      }
    })
    .catch((error) => {
      handleError(error, "Something went Wrong");
      dispatch(gettingNewsFailed());
    });
};
