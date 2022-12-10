import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";

import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Loading from "../../layout/Loading";
import { useDispatch, useSelector } from "react-redux";
import { getTopNews } from "../../../Redux/Reducers/MainDashboard";
import ToolBar from "../../layout/timeLineToolBar";

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

export default function Home() {
  const classes = useStyles();
  const dispatch = useDispatch();
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
              The New York Times
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="textSecondary"
              paragraph
            >
              The New York Times is an American daily newspaper based in New
              York City with a worldwide readership reported in 2020 to be a
              declining 840,000 paid print subscribers, and a growing 6 million
              paid digital subscribers. It also is a producer of popular
              podcasts such as The Daily.
            </Typography>
            <div className={classes.heroButtons}>
              <Grid container spacing={2} justifyContent="center">
                <SearchBar />
                <ToolBar
                  listBy={listBy}
                  setListBy={setListBy}
                  listByEnum={listByEnum}
                  toolChangeHandle={toolChangeHandle}
                  loading={loading}
                />
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
