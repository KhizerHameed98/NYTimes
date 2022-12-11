import { makeStyles, Typography } from "@material-ui/core";
import React from "react";
import { Link, NavLink } from "react-router-dom";
import browserRoute from "../../Constants/browserRoutes";
const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));
const Footer = () => {
  const classes = useStyles();
  function Copyright() {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        {"Copyright © "}
        <NavLink color="inherit" to={browserRoute?.HOME}>
          NYTimes
        </NavLink>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    );
  }
  return (
    <>
      {/* Footer */}
      <footer className={classes.footer} style={{ marginTop: "100px" }}>
        <Typography variant="h6" align="center" gutterBottom>
          NY Times
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="textSecondary"
          component="p"
        >
          Its strength is in its editorial excellence; it has never been the
          largest newspaper in terms of circulation.
        </Typography>
        <Copyright />
      </footer>
      {/* End footer */}
    </>
  );
};

export default Footer;
