import { combineReducers } from "@reduxjs/toolkit";

import authReducer from "../../Reducers/Auth/auth";
export default combineReducers({
  login: authReducer,
});
