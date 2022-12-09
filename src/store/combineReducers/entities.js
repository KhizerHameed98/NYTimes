import { combineReducers } from "@reduxjs/toolkit";

import loginReducer from "./credentials";
import dashboard from "../../Redux/Reducers/MainDashboard";
import filters from "../../Redux/Reducers/Filters";
export default combineReducers({
  auth: loginReducer,
  dashboard: dashboard,
  filters: filters,
});
