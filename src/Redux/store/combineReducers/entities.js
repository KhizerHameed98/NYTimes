import { combineReducers } from "@reduxjs/toolkit";

import loginReducer from "./credentials";
import dashboard from "../../Reducers/MainDashboard";
import articles from "../../Reducers/ArticleDashboard";
import filters from "../../Reducers/Filters";
export default combineReducers({
  auth: loginReducer,
  dashboard: dashboard,
  filters: filters,
  articles: articles,
});
