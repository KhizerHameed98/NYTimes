import store from "../store/configStore";

export const getUser = () => {
  return store.getState().pReducers.user;
};
