import React from "react";
import { Box } from "@material-ui/core";
// import Sidebar from "./../../components/common/Leftbar/Sidebar";

import { useSelector, useDispatch } from "react-redux";
import Navbar from "../components/pages/Navbar";
import Footer from "../components/pages/Footer";

function Layout({ children }) {
  const { userToken } = useSelector((state) => state.pReducers.user);

  return (
    <Box>
      <>
        {userToken ? (
          <>
            <Navbar />
            {/* <Sidebar userView={view} handleView={() => setView(!view)} /> */}
          </>
        ) : null}
      </>
      <main>{children}</main>

      {userToken ? <Footer /> : null}
    </Box>
  );
}

export default Layout;
