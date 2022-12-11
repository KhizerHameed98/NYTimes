import React from "react";
import { makeStyles } from "@material-ui/core/styles";
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
  handleChange,
  totalCount,
  rowsPerPage,
}) {
  const classes = useStyles();
  const apiTotalPageRange = 200;
  return (
    <div className={classes.root}>
      <Pagination
        count={
          Math.ceil(totalCount / rowsPerPage) < apiTotalPageRange
            ? Math.ceil(totalCount / rowsPerPage)
            : apiTotalPageRange
        }
        page={page}
        onChange={handleChange}
      />
    </div>
  );
}
