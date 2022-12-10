import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

import browserRoute from "../Constants/browserRoutes";

const PrivateRoute = ({ component: Component, access, ...rest }) => {
  // console.log("PrivateRoute-->>");

  const { userToken } = useSelector((state) => state.pReducers.user);
  // console.log("roles--->>", roles);
  // console.log("access--->>", access);

  return (
    <>
      {userToken ? (
        <Route {...rest} render={(props) => <Component {...props} />} />
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
