import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { combineReducers } from "redux";

import reducer from "./combineReducers/entities";
import storage from "redux-persist/lib/storage";
import { encryptTransform } from "redux-persist-transform-encrypt";
import { persistReducer } from "redux-persist";
import UserReducer from "../Redux/Reducers/UserReducer";

const pReducersForEncryption = combineReducers({
  user: UserReducer,
});
const persistConfig = {
  key: "root",
  storage,
  transforms: [
    encryptTransform({
      secretKey: "my-super-secret-key",
      onError: function (error) {
        // console.log("error occured while encryption");
      },
    }),
  ],
};

const pReducers = persistReducer(persistConfig, pReducersForEncryption);
export default configureStore({
  reducer: {
    pReducers: pReducers,
    npReducers: reducer,
  },
  middleware: [
    ...getDefaultMiddleware({
      serializableCheck: false,
    }),
  ],
});
