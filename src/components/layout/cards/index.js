import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@material-ui/core";
import React, { Fragment } from "react";
import { NavLink } from "react-router-dom";
import NoRecordFound from "../../Common/NoRecordFound";

const ListCard = ({ data, classes }) => {
  return (
    <>
      {data && data?.length > 0 ? (
        data.map((data, index) => (
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
                <NavLink to={`/article-detail/${index}`}>
                  <Button size="small" color="primary">
                    View
                  </Button>
                </NavLink>
              </CardActions>
            </Card>
          </Grid>
        ))
      ) : (
        <NoRecordFound />
      )}
    </>
  );
};

export default ListCard;
