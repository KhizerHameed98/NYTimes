import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  userToken: "",
};

export const UserReducer = createSlice({
  name: "user",
  initialState,
  reducers: {
    setdenialByClaimsPageColumnSetting(state, action) {
      return { ...state, denialByClaimsPageColumnSetting: action.payload };
    },
    setClaimAjdGBClaimPageColumnSetting(state, action) {
      return { ...state, claimAjdGBClaimPageColumnSetting: action.payload };
    },
    setClaimAjdGBServiceLinePageColumnSetting(state, action) {
      return {
        ...state,
        claimAjdGBServiceLinePageColumnSetting: action.payload,
      };
    },
    setPartiallyDeniedPageColumnSetting(state, action) {
      return {
        ...state,
        partiallyDeniedPageColumnSetting: action.payload,
      };
    },
    setReversalPageColumnSetting(state, action) {
      return {
        ...state,
        reversalPageColumnSetting: action.payload,
      };
    },
    updateApplicationToken(state, action) {
      return { ...state, applicationToken: action.payload };
    },
    updateMemberMe(state, action) {
      return { ...state, rememberMe: action.payload };
    },
    setConfirmCode_Screen(state, action) {
      return { ...state, confirmCode_screen: action.payload };
    },
    setConfirmCode_Screen_info(state, action) {
      return { ...state, confirmCode_screen_info: action.payload };
    },
    setPreferences(state, action) {
      state = { ...state, userPreferences: action.payload };
      return state;
    },
    userData(state, action) {
      const { payload } = action;
      state = {
        ...state,
        userToken: payload,
      };
      window.localStorage.setItem("userToken", payload);
      return state;
    },
    ClaimMng837ColumnsSetting(state, action) {
      const { payload } = action;
      state = {
        ...state,
        loginUserData: payload.loginUserData,
      };
      return state;
    },
    updateUserName(state, action) {
      return { ...state, userName: action.payload };
    },
    updateSubscriptionId(state, action) {
      return { ...state, subscriptionID: action.payload };
    },
    updateDomainId(state, action) {
      return { ...state, domainID: action.payload };
    },
    updateDrawerState(state, action) {
      return { ...state, drawerState: action.payload };
    },
    updateSubLeftMenu(state, action) {
      return { ...state, subLeftMenu: action.payload };
    },
    updateMenuStyle(state, action) {
      return { ...state, menuStyle: action.payload };
    },
    updateInsightsDropDown(state, action) {
      return { ...state, insightsDropDown: action.payload };
    },
    updateDenialDropDown(state, action) {
      return { ...state, denialDropDown: action.payload };
    },
    updateClaimsDropDown(state, action) {
      return {
        ...state,
        claimsDropDown: action.payload,
        denialDropDown: false,
        reportsDropDown: false,
        insightsDropDown: false,
      };
    },
    updateReportsDropDown(state, action) {
      return {
        ...state,
        reportsDropDown: action.payload,
        claimsDropDown: false,
        denialDropDown: false,
        insightsDropDown: false,
      };
    },
    setClaimManger(state, action) {
      state = { ...state, claimManager: action.payload };
      return state;
    },
    setClaimPayment(state, action) {
      state = { ...state, claimPaymentColumn: action.payload };
      return state;
    },
    setLoginTime(state, action) {
      state = { ...state, loginTime: action.payload };
      return state;
    },
    updateLoginUserData(state, action) {
      return { ...state, loginUserData: action.payload };
    },
    updateUserToken(state, action) {
      return { ...state, userToken: action.payload };
    },
  },
});

export const {
  userData,
  setClaimManger,
  setClaimPayment,
  setPreferences,
  setLoginTime,
  setdenialByClaimsPageColumnSetting,
  setClaimAjdGBClaimPageColumnSetting,
  setClaimAjdGBServiceLinePageColumnSetting,
  setPartiallyDeniedPageColumnSetting,
  setReversalPageColumnSetting,
  updateApplicationToken,
  updateInsightsDropDown,
  updateDrawerState,
  updateSubLeftMenu,
  updateMenuStyle,
  updateDenialDropDown,
  updateReportsDropDown,
  updateSubscriptionId,
  updateDomainId,
  updateUserName,
  updateLoginUserData,
  updateUserToken,
  updateMemberMe,
  setConfirmCode_Screen,
  setConfirmCode_Screen_info,
  updateClaimsDropDown,
  ClaimMng837ColumnsSetting,
} = UserReducer.actions;
export default UserReducer.reducer;
