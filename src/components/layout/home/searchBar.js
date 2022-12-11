import React, { useCallback } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import Autocomplete from "@material-ui/lab/Autocomplete";

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
    width: "300px",
    backgroundColor: "lightgray",
    borderColor: "black",
    padding: "10px",
    borderRadius: "50px",
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));

export default function SearchBar({
  onChangeHandler,
  setLoadingMain,
  searchHistory,
}) {
  const classes = useStyles();

  return (
    <div component="form">
      <Autocomplete
        freeSolo
        id="combo-box-demo"
        options={searchHistory}
        getOptionLabel={(option) => option}
        onInputChange={(event, value) => {
          setLoadingMain(true);
          onChangeHandler(value);
        }}
        renderInput={(params) => {
          const { InputLabelProps, InputProps, ...rest } = params;

          return (
            <InputBase
              {...params.InputProps}
              {...rest}
              className={classes.input}
              placeholder=" What you are looking for?"
            />
          );
        }}
      />
    </div>
  );
}
