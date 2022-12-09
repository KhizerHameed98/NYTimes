import { createSlice } from "@reduxjs/toolkit";

export const Dashboard = createSlice({
  name: "dashboard",
  initialState: {
    dashboardList: [],
    loadingClass: false,
  },
  reducers: {
    setNews: (state, action) => {
      state.dashboardList = action.payload;
    },
  },
});

export const { dashboardAction } = Dashboard.actions;

export const dashboardList = () => async (dispatch) => {
  const dashboardList = "";
  dispatch(dashboardAction(dashboardList.data.data));
  return dashboardList.data.data;
};

export default Dashboard.reducer;
