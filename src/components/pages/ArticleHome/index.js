import React, { useCallback, useEffect, useState } from "react";

import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Loading from "../../layout/Loading";
import { useDispatch, useSelector } from "react-redux";
import { debounce } from "lodash";

import { getTopNews } from "../../../Redux/Reducers/MainDashboard";

import ListCard from "../../layout/cards";
import SearchBar from "../../layout/home/searchBar";

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

export default function ArticleHome() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [query, setQuery] = useState("");

  const { loading, newsList, listByState } = useSelector(
    (state) => state.npReducers.dashboard
  );
  const listByEnum = {
    All: "All",
    World: "World",
    Science: "Science",
  };
  const [listBy, setListBy] = useState(
    listByState ? listByState : listByEnum?.All
  );
  const changeHandler = (event) => {
    console.log("hey khizer===", event);
    setQuery(event.target.value);
  };
  const debouncedChangeHandler = useCallback(debounce(changeHandler, 500), []);

  useEffect(() => {
    if (!newsList) {
      dispatch(getTopNews(listBy));
    }
  }, []);

  const toolChangeHandle = (value) => {
    setListBy(value);
    dispatch(getTopNews(value));
  };
  return (
    <React.Fragment>
      <CssBaseline />

      <main>
        {/* Hero unit */}
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography
              className="mt-3"
              component="h1"
              variant="h2"
              align="center"
              color="textPrimary"
              gutterBottom
            >
              Explore NYTimes
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="textSecondary"
              paragraph
            >
              The New York Times Article Archive can be accessed through archive
              search at nytimes.com. Archive articles come in several formats
              depending on the age of the article: Articles published after 1980
              are available in full-text. Articles from 1851-1980 are available
              either in full-text or partial articles.
            </Typography>
            <div className={classes.heroButtons}>
              <Grid container spacing={2} justifyContent="center">
                <SearchBar onChangeHandler={debouncedChangeHandler} />
              </Grid>
            </div>
          </Container>
        </div>
        <Container className={classes.cardGrid} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {loading ? (
              <Loading />
            ) : (
              <ListCard data={newsList} classes={classes} />
            )}
          </Grid>
        </Container>
      </main>

      {/* End footer */}
    </React.Fragment>
  );
}
