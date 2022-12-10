import { createSlice } from "@reduxjs/toolkit";
export const initialListingState = {
  loading: false,
  cachePagination: {},
  cacheParams: {},
  currentPage: 1,
  pageNumber: 1,
};

export const listingSlice = createSlice({
  name: "listings",
  initialState: {
    login: {
      ...initialListingState,
    },
    signup: {
      ...initialListingState,
    },
    dashboard: {
      ...initialListingState,
    },
  },
  reducers: {
    setListingState: (state, action) => {
      let { payload } = action;

      state[payload.listing] = {
        ...state[payload.listing],
        ...payload.value,
      };
    },
  },
});
export const { setListingState } = listingSlice.actions;
export default listingSlice.reducer;
