import "./App.css";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./components/pages/Home/Home";
import Register from "./components/layout/auth/Register";
import React, { lazy, Suspense, useEffect } from "react";
import Login from "./components/layout/auth/Login";
import Layout from "./HOC/Layout";
import PublicRoute from "./HOC/publiceRoute";
import RoleBaseAccessRoute from "./Routes/roleBaseAccessRoute";
import { CircularProgress, Grid } from "@material-ui/core";

function App() {
  return (
    <Router>
      <Layout>
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <Suspense
          fallback={
            <Grid container spacing={3} className="mt-5">
              <Grid item xs={12}>
                <div className="mt-3" style={{ position: "relative" }}>
                  <div className={"data-loading"}>
                    <div className="cliam-ui-table-2">
                      <CircularProgress color="secondary" />
                    </div>
                  </div>
                </div>
              </Grid>
            </Grid>
          }
        >
          <Switch>
            {/* <Route exact path="/" component={Home} /> */}

            <PublicRoute path="/auth">
              <Login />
            </PublicRoute>
            <PublicRoute path="/register">
              <Register />
            </PublicRoute>
            <RoleBaseAccessRoute />
          </Switch>
        </Suspense>
      </Layout>
    </Router>
  );
}

export default App;
