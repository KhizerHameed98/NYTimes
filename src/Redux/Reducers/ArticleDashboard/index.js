import { createSlice } from "@reduxjs/toolkit";
import genericAxiosCall from "../../../AxiosConfig/genericAxiosCall";
import { serverRoutes } from "../../../Constants/serverRoutes";
import { handleError } from "../../../middlewares/errorHandler";
import { updateSearchHistory } from "../UserReducer";
//////////////////////////////////////////////////////////////
//                      Reducers
//////////////////////////////////////////////////////////////

const slice = createSlice({
  name: "articles",
  initialState: {
    loading: true,
    newsList: null,
    totalCount: null,
  },
  reducers: {
    gettingNewsRequested: (state, action) => {
      state.loading = true;
    },
    gettingNewsSuccess: (state, action) => {
      state.newsList = action.payload?.docs;
      state.totalCount = action.payload?.meta?.hits;
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
export const getArticleByQuery = (query, page) => (dispatch, getState) => {
  dispatch(gettingNewsRequested());
  let currentState = getState().pReducers.user;
  dispatch(updateSearchHistory({ query, currentState }));
  let params = {
    page: page ? page : 0,
    q: query ? query : "",
  };
  genericAxiosCall(serverRoutes?.GET_ARTICLE_SEARCH, "get", "", params)
    .then((res) => {
      if (res.data.status) {
        let data = res.data.response;
        dispatch(gettingNewsSuccess(data));
      }
    })
    .catch((error) => {
      handleError(error, "Something went Wrong");
      dispatch(gettingNewsFailed());
    });
};
