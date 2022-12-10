import { lazy } from "react";

import browserRoutes from "../Constants/browserRoutes";

const Home = lazy(() => import("../components/pages/Home/index"));
const ArticleDetail = lazy(() => import("../components/pages/ArticleDetail"));
const ArticleHome = lazy(() => import("../components/pages/ArticleHome"));

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
  {
    path: browserRoutes?.ARTICLE_HOME,
    // exact: true,
    name: "ArticleHome",
    component: ArticleHome,
  },
];

export default componentsArray;
