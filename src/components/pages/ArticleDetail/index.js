import React, { useEffect, useState } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { useSelector } from "react-redux";
import { NavLink, useHistory, useParams } from "react-router-dom";
import browserRoute from "../../../Constants/browserRoutes";
import Loading from "../../layout/Loading";
import { Button, Grid, makeStyles, Paper } from "@material-ui/core";
import DrawerSideBar from "../../layout/articleDetail/sideBar";
import { comments } from "../../Common/Comments/mockData";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
    textAlign: "center",
  },
  paper: {
    padding: theme.spacing(2),

    color: theme.palette.text.secondary,
  },
  mdContainer: {
    display: "flex",
    justifyContent: "center",
    paddingRight: "80px",
    paddingLeft: "80px",
    marginTop: "10px",
    fontWeight: "bolder",
    color: "gray",
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));
export default function ArticleDetail() {
  const classes = useStyles();
  const { id } = useParams();
  const history = useHistory();
  const { newsList, listByState } = useSelector(
    (state) => state.npReducers.dashboard
  );
  const [loading, setLoading] = useState(true);
  const [article, setArticle] = useState({});
  const validateId = () => {
    if (
      id &&
      newsList &&
      newsList?.length > 0 &&
      id <= newsList?.length &&
      id >= 0
    ) {
      return true;
    } else {
      history.push(browserRoute?.HOME);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    let isValid = validateId();
    if (isValid) {
      setLoading(false);
      setArticle(newsList[id]);
    }
  }, [id]);
  useEffect(() => {
    console.log("hey khizer===", article);
  }, [article]);

  return (
    <React.Fragment>
      <CssBaseline />
      <Container>
        {loading ? (
          <Grid className="mt-5 pt-5 pb-5">
            <Loading />
          </Grid>
        ) : (
          <>
            <Container maxWidth="md">
              <Typography
                component="div"
                className="mt-5 pt-5 pb-5 "
                style={{ justifyContent: "center", alignItems: "center" }}
              >
                <h1>{article?.title}</h1>
                <br />
                <h3>{article?.abstract}</h3>
              </Typography>
            </Container>
            <div className="img-container">
              <img
                className="article-img"
                src={
                  article?.multimedia?.length > 0
                    ? article?.multimedia[0]?.url
                    : "https://static01.nyt.com/images/2022/12/09/multimedia/09xp-sinema-1-c377/09xp-sinema-1-c377-superJumbo.jpg"
                }
                alt=""
              />
            </div>
            <CssBaseline />

            <Container maxWidth="md" className={classes.mdContainer}>
              <div className={classes.root}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <span>
                      {article?.multimedia?.length > 0
                        ? article?.multimedia[0]?.caption
                        : ""}
                    </span>
                  </Grid>
                  <Grid item xs={6}>
                    {article?.byline}{" "}
                    {article?.created_date &&
                      `(${new Date(article?.created_date)
                        .toISOString()
                        .slice(0, 10)})`}
                  </Grid>
                  <Grid item xs={6}>
                    {article?.multimedia?.length > 0
                      ? article?.multimedia[0]?.copyright + "© "
                      : ""}
                  </Grid>
                  <Grid item xs={6}>
                    <Paper className={classes.paper}>xs=6</Paper>
                  </Grid>
                  <Grid item xs={3}>
                    <Paper className={classes.paper}>xs=3</Paper>
                  </Grid>
                  <Grid item xs={3}>
                    <Paper className={classes.paper}>xs=3</Paper>
                  </Grid>
                  <Grid item xs={3}>
                    <Paper className={classes.paper}>xs=3</Paper>
                  </Grid>
                  <Grid item xs={12}>
                    <DrawerSideBar comments={comments} />
                  </Grid>
                </Grid>
              </div>
            </Container>
          </>
        )}
      </Container>
    </React.Fragment>
  );
}
