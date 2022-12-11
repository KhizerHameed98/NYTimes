import { Grid, makeStyles } from "@material-ui/core";
import React from "react";
const useStyles = makeStyles(() => ({
  text: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "20px",
  },
}));
const NoRecordFound = () => {
  const classes = useStyles();

  return (
    <Grid item className=" mt-5">
      <div className={classes.text}>No Record Found</div>
    </Grid>
  );
};

export default NoRecordFound;
