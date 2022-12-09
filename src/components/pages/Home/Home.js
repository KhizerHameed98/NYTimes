import React, { useEffect, useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";

import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";
import Loading from "../../layout/Loading";
import { useDispatch, useSelector } from "react-redux";
import { getTopNews } from "../../../Redux/Reducers/MainDashboard";
import { Card, CardActions, CardContent, CardMedia } from "@material-ui/core";
import ToolBar from "../../layout/timeLineToolBar";

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
    dispatch(getTopNews(listBy));
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
              Something short and leading about the collection below—its
              contents, the creator, etc. Make it short and sweet, but not too
              short so folks don&apos;t simply skip over it entirely.
            </Typography>
            <div className={classes.heroButtons}>
              <Grid container spacing={2} justifyContent="center">
                <Grid item>
                  <Button variant="contained" color="primary">
                    Main call to action
                  </Button>
                </Grid>
                <Grid item>
                  <Button variant="outlined" color="primary">
                    Secondary action
                  </Button>
                </Grid>
                <ToolBar
                  listBy={listBy}
                  setListBy={setListBy}
                  listByEnum={listByEnum}
                  toolChangeHandle={toolChangeHandle}
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
              <>
                {newsList && newsList?.length > 0
                  ? newsList.map((data, index) => (
                      <Grid item key={index} xs={12} sm={6} md={4}>
                        <Card className={classes.card}>
                          <CardMedia
                            className={classes.cardMedia}
                            image={
                              data?.multimedia && data?.multimedia?.length > 0
                                ? data?.multimedia[1]?.url
                                : ""
                            }
                            title="Image title"
                          />
                          <CardContent className={classes.cardContent}>
                            <Typography
                              gutterBottom
                              variant="h6"
                              component="h1"
                              style={{ fontWeight: "bold" }}
                            >
                              {data?.title}
                            </Typography>
                            <Typography>{data?.abstract}</Typography>
                          </CardContent>
                          <CardActions>
                            <Button size="small" color="primary">
                              View
                            </Button>
                            <Button size="small" color="primary">
                              Edit
                            </Button>
                          </CardActions>
                        </Card>
                      </Grid>
                    ))
                  : null}
              </>
            )}
          </Grid>
        </Container>
      </main>

      {/* End footer */}
    </React.Fragment>
  );
}
