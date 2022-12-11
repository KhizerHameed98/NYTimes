import { Route, Redirect } from "react-router-dom";

import { useSelector } from "react-redux";
// import browserRoute from "./Constants/browserRoutes";
import browserRoute from "../Constants/browserRoutes";

function PublicRoute({ children, isAuthenticated, ...rest }) {
  const { userToken } = useSelector((state) => state.pReducers.user);

  return (
    <Route
      {...rest}
      render={({ location }) =>
        !userToken ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: browserRoute.HOME,
              state: { from: location },
              // pathname: "/",
            }}
          />
        )
      }
    />
  );
}

export default PublicRoute;
