import "./App.css";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Register from "./components/layout/auth/Register";
import React, { Suspense } from "react";
import Login from "./components/layout/auth/Login";
import Layout from "./HOC/Layout";
import PublicRoute from "./HOC/publiceRoute";
import RoleBaseAccessRoute from "./Routes/roleBaseAccessRoute";
import { Grid } from "@material-ui/core";
import Loading from "./components/layout/Loading";

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
                      <Loading />
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
