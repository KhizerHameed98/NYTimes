import React, { useState } from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

import browserRoute from "../Constants/browserRoutes";

const PrivateRoute = ({ component: Component, access, ...rest }) => {
  // console.log("PrivateRoute-->>");

  const [SuperAdmin, setSuperAdmin] = useState(false);

  const { userToken, loginUserData } = useSelector(
    (state) => state.pReducers.user
  );
  const { roles } = loginUserData;
  // console.log("roles--->>", roles);
  // console.log("access--->>", access);

  const handleUserRoleBaseAccess = () => {
    let hasUserRole = [];
    // let access = ["Managerrr", "israr"];
    if (roles?.length) {
      hasUserRole = roles.map((a) => a.name);
    }

    const result = hasUserRole.filter((element) => access.includes(element));

    // console.log("===================--->>");
    // console.log("hasUserRole--->>", hasUserRole);
    // console.log("access--->>", access);
    // console.log("result--->>", result);

    // if (hasUserRole?.[0] === "Super Administrator") {
    //   setSuperAdmin(true);
    // } else {
    //   setSuperAdmin(false);
    // }

    if (hasUserRole?.length) {
      setSuperAdmin(hasUserRole.includes("Super Administrator"));
    }

    if (result?.length) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <>
      {userToken ? (
        <Route
          {...rest}
          render={(props) =>
            handleUserRoleBaseAccess() ? ( // handleUserRoleBaseAccess should be "handleUserRoleBaseAccess()" means function brackets must included
              <Component {...props} />
            ) : (
              <Redirect
                to={{
                  pathname: SuperAdmin
                    ? browserRoute.SUPER_ADMIN_PANEL_DASHBOARD
                    : browserRoute.INSIGHTS_DASHBOARD,
                }}
              />
            )
          }
        />
      ) : (
        <Route
          {...rest}
          render={() => (
            <Redirect
              to={{
                pathname: browserRoute.LOGIN,
              }}
            />
          )}
        />
      )}
    </>
  );
};

export default PrivateRoute;
