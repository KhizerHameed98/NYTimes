import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Pagination from "@material-ui/lab/Pagination";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > * + *": {
      marginTop: theme.spacing(4),
    },
    marginTop: "50px",
    display: "flex",
    justifyContent: "center",
  },
}));

export default function PaginationControlled({
  page,
  setPage,
  handleChange,
  totalCount,
  rowsPerPage,
}) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Pagination
        count={Math.ceil(totalCount / rowsPerPage)}
        page={page}
        onChange={handleChange}
      />
    </div>
  );
}
