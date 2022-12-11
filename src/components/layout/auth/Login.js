import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";

import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { NavLink } from "react-router-dom";
import PasswordComplexity from "joi-password-complexity";

import { useDispatch, useSelector } from "react-redux";
import Joi from "joi";

import { loginRequest } from "../../../Redux/Reducers/Auth/auth";
import { CircularProgress } from "@material-ui/core";
import browserRoute from "../../../Constants/browserRoutes";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage: "url(https://source.unsplash.com/random)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Login(props) {
  const classes = useStyles();

  const dispatch = useDispatch();

  const { loading } = useSelector((state) => state.npReducers.auth.login);
  const initialState = {
    account: {
      email: "",
      password: "",
    },
    errors: {
      email: "",
      password: "",
    },
  };

  const [data, setData] = useState(initialState);
  const [loginError, setLoginError] = useState(null);

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const errors = validation();
    const newData = { ...data };

    newData.errors = errors || {};
    setData(newData);

    if (errors) {
      setLoginError(errors?.password ? errors.password : errors.email);
      return null;
    }

    dispatch(loginRequest(newData.account));
  };

  const handleOnChange = (e) => {
    const newData = { ...data };
    newData.errors = {};
    setLoginError(null);
    newData.account[e.currentTarget.name] = e.currentTarget.value;
    setData(newData);
  };
  const validation = () => {
    const schema = Joi.object({
      email: Joi.string()
        .min(5)
        .required()
        .email({ tlds: { allow: false } }),
      password: new PasswordComplexity({
        min: 8,
        max: 50,
        lowerCase: 1,
        upperCase: 1,
        numeric: 1,
        symbol: 1,
      }).required(),
    });
    const { error } = schema.validate(data.account);
    if (!error) return null;
    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
  };

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid
        item
        xs={12}
        sm={8}
        md={5}
        component={Paper}
        elevation={6}
        square
        className="pt-5"
      >
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          {loginError && (
            <small className="alert alert-danger text-center mt-3">
              {loginError}
            </small>
          )}

          <form className={classes.form} onSubmit={handleOnSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              error={data.errors.email}
              value={data.account.email}
              onChange={handleOnChange}
              autoComplete="email"
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              error={data.errors.password}
              value={data.account.password}
              onChange={handleOnChange}
              autoComplete="current-password"
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              disabled={loading}
            >
              {loading ? <CircularProgress color="secondary" /> : "Sign In"}
            </Button>

            <Grid container>
              <Grid item>
                <NavLink to={browserRoute?.SIGNUP}>
                  {"Don't have an account? Sign Up"}
                </NavLink>
              </Grid>
            </Grid>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}
