import { lazy } from "react";

import browserRoutes from "../Constants/browserRoutes";

const Home = lazy(() => import("../components/pages/Home/Home"));

const componentsArray = [
  {
    path: browserRoutes?.HOME,
    exact: true,
    name: "Home",
    component: Home,
  },
];

export default componentsArray;
