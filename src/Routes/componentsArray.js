import { lazy } from "react";

import browserRoutes from "../Constants/browserRoutes";

const Home = lazy(() => import("../components/pages/Home/index"));
const ArticleDetail = lazy(() => import("../components/pages/ArticleDetail"));
const componentsArray = [
  {
    path: browserRoutes?.HOME,
    exact: true,
    name: "Home",
    component: Home,
  },
  {
    path: browserRoutes?.ARTICLE_DETAIL,
    // exact: true,
    name: "ArticleDetail",
    component: ArticleDetail,
  },
];

export default componentsArray;
