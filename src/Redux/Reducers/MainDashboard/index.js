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
  name: "dasboard",
  initialState: {
    loading: false,
    newsList: null,
  },
  reducers: {
    gettingNewsRequested: (state, action) => {
      state.loading = true;
    },
    gettingNewsSuccess: (state, action) => {
      state.newsList = action.payload;

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
export const getTopNews = () => (dispatch) => {
  dispatch(gettingNewsRequested());
  genericAxiosCall(serverRoutes?.GET_TOP_NEWS, "get", "", "")
    .then((res) => {
      if (res.data.status) {
        let data = res.data.results;
        dispatch(gettingNewsSuccess(data));
      }
    })
    .catch((error) => {
      handleError(error, "Something went Wrong");
      dispatch(gettingNewsFailed());
    });
};
