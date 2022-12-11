import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { debounce } from "lodash";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Loading from "../../layout/Loading";
import SearchBar from "../../layout/home/searchBar";
import { getArticleByQuery } from "../../../Redux/Reducers/ArticleDashboard";
import ArticleCard from "../../layout/articleHome/articleCard";

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
  const [page, setPage] = React.useState(1);

  const { loading, newsList, totalCount } = useSelector(
    (state) => state.npReducers.articles
  );
  const { searchHistory } = useSelector((state) => state.pReducers.user);
  const [loadingMain, setLoadingMain] = useState(true);
  const handleChangePage = (event, value) => {
    setLoadingMain(true);
    setPage(value);
    dispatch(getArticleByQuery(query, value - 1));
  };
  const changeHandler = (event) => {
    setPage(1);
    setQuery(event);
    dispatch(getArticleByQuery(event, 0));
  };
  useEffect(() => {
    if (loading === false) {
      setLoadingMain(false);
    }
  }, [loading]);
  const debouncedChangeHandler = useCallback(debounce(changeHandler, 800), []);

  useEffect(() => {
    dispatch(getArticleByQuery("", page - 1));
  }, []);
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
                <SearchBar
                  searchHistory={searchHistory}
                  onChangeHandler={debouncedChangeHandler}
                  setLoadingMain={setLoadingMain}
                />
              </Grid>
            </div>
          </Container>
        </div>
        <Container className={classes.cardGrid} maxWidth="md">
          {/* End hero unit */}
          {loadingMain ? (
            <Loading />
          ) : (
            <>
              <ArticleCard
                data={newsList}
                page={page}
                handleChange={handleChangePage}
                totalCount={totalCount}
                rowsPerPage={10}
              />
            </>
          )}
        </Container>
      </main>
    </React.Fragment>
  );
}
