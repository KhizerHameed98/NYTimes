import React, { useCallback } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
// import { ReactSearchAutocomplete } from "react-search-autocomplete";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "10px 15px",
    display: "flex",
    alignItems: "center",
    width: 600,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));

export default function SearchBar({ onChangeHandler }) {
  const classes = useStyles();

  return (
    <Paper component="form" className={classes.root}>
      <InputBase
        className={classes.input}
        placeholder="What you are looking for?"
        autoComplete="hello"
        inputProps={{ "aria-label": "What you are looking for?" }}
        onChange={(event) => {
          onChangeHandler(event.target.value);
        }}
      />
      <IconButton
        type="submit"
        className={classes.iconButton}
        aria-label="search"
      >
        <SearchIcon />
      </IconButton>
      {/* <Divider className={classes.divider} orientation="vertical" /> */}
    </Paper>
  );
}
