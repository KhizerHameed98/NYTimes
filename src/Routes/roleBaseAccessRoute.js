import React, { Fragment } from "react";
import componentsArray from "./componentsArray";
import PrivateRoute from "./privateRoute";

const RoleBaseAccessRoute = () => {
  const menu = componentsArray.map((route, index) => {
    return route.component ? (
      <PrivateRoute
        key={index}
        exact={route.exact}
        path={route.path}
        name={route.name}
        component={route.component}
        access={route.roleBaseAccess}
      />
    ) : null;
  });

  return <Fragment>{menu}</Fragment>;
};

export default RoleBaseAccessRoute;
