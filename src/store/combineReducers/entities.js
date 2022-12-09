import { combineReducers } from "@reduxjs/toolkit";

import entitiesReducer from "./rootReducer";
import loginReducer from "./credentials";
import paymentReducer from "./paymentCredentials";
import newAdminReducer from "../admin/admin";
import filters from "../../Redux/Reducers/Filters";
import Dashboard from "../../Redux/Reducers/MainDashboard/dashboardSlice";
export default combineReducers({
  auth: loginReducer,
  filters: filters,
  dashboard: Dashboard,
});
