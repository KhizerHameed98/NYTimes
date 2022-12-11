import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";

import reducer from "./combineReducers/entities";
import storage from "redux-persist/lib/storage";
import { encryptTransform } from "redux-persist-transform-encrypt";
import { persistReducer } from "redux-persist";
import UserReducer from "../Reducers/UserReducer";

const pReducersForEncryption = combineReducers({
  user: UserReducer,
});
const persistConfig = {
  key: "root",
  storage,
  transforms: [
    encryptTransform({
      secretKey: "my-super-secret-key",
      onError: function (error) {},
    }),
  ],
};

const pReducers = persistReducer(persistConfig, pReducersForEncryption);

let store = configureStore({
  reducer: {
    pReducers: pReducers,
    npReducers: reducer,
  },

  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
