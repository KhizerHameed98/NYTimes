import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { Grid, IconButton, makeStyles } from "@material-ui/core";
import DrawerSideBar from "../../layout/articleDetail/sideBar";
import { comments } from "../../Common/Comments/mockData";
import browserRoute from "../../../Constants/browserRoutes";
import Loading from "../../layout/Loading";

import LaunchIcon from "@material-ui/icons/Launch";
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
  shareIcon: {
    cursor: "pointer",
  },
}));
export default function ArticleDetail() {
  const classes = useStyles();
  const { id } = useParams();
  const history = useHistory();
  const { newsList } = useSelector((state) => state.npReducers.dashboard);
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

  const getTags = (arr) => {
    let temp = "";
    arr.map((item, index) => {
      if (!temp) {
        temp = item;
      } else {
        temp = temp + ", " + item;
      }
    });
    return temp;
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    let isValid = validateId();
    if (isValid) {
      setLoading(false);
      setArticle(newsList[id]);
    }
  }, []);

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
                <h5 style={{ color: "#3f51b5" }}>
                  {article?.section.toUpperCase()},{" "}
                  {article?.subsection.toUpperCase()}
                </h5>
                <h1>{article?.title}</h1>
                <br />
                <h3>{article?.abstract}</h3>

                <a
                  className="no-decoration-link"
                  href={article?.url ? article?.url : "#"}
                >
                  <IconButton className="shareIcon">
                    <LaunchIcon />
                  </IconButton>
                </a>
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
                  <Grid item xs={12} lg={6} md={6}>
                    {article?.byline}{" "}
                    {article?.created_date &&
                      `(${new Date(article?.created_date)
                        .toISOString()
                        .slice(0, 10)})`}
                  </Grid>
                  <Grid item xs={12} lg={6} md={6}>
                    {article?.multimedia?.length > 0
                      ? article?.multimedia[0]?.copyright + "© "
                      : ""}
                  </Grid>
                  <Grid item xs={12} lg={12} md={12}>
                    {article?.published_date &&
                      `Published date: ${new Date(article?.published_date)
                        .toISOString()
                        .slice(0, 10)}`}
                  </Grid>
                  <Grid item xs={12} lg={12} md={12}>
                    {article?.kicker && `Kicker: ${article?.kicker}`}
                  </Grid>
                  <Grid item xs={12} lg={6} md={6}>
                    <ul className="tagsList">
                      <li>
                        {article?.des_facet &&
                          article?.des_facet?.length > 0 &&
                          `des_facet: ${getTags(article?.des_facet)}`}
                      </li>
                      <li>
                        {article?.per_facet &&
                          article?.per_facet?.length > 0 &&
                          `per_facet: ${getTags(article?.per_facet)}`}
                      </li>
                    </ul>
                  </Grid>

                  <Grid item xs={12} lg={6} md={6}>
                    <ul className="tagsList">
                      <li>
                        {article?.org_facet &&
                          article?.org_facet?.length > 0 &&
                          `org_facet: ${getTags(article?.org_facet)}`}
                      </li>
                      <li>
                        {article?.geo_facet &&
                          article?.geo_facet?.length > 0 &&
                          `geo_facet: ${getTags(article?.geo_facet)}`}
                      </li>
                    </ul>
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
