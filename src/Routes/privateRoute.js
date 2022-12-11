import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

import browserRoute from "../Constants/browserRoutes";

const PrivateRoute = ({ component: Component, access, ...rest }) => {
  const { userToken } = useSelector((state) => state.pReducers.user);

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
