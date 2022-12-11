import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { serverRoutes } from "../../../Constants/serverRoutes";
const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
  cardHeader: {
    height: "100px",
  },
  abstractText: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: `
    -webkit-box,
   -webkit-line-clamp: 2,
           line-clamp: 2, 
   -webkit-box-orient: vertical`,
  },
}));
const Cards = ({ data }) => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  return (
    <Card className={classes.root}>
      <CardHeader
        className={classes.cardHeader}
        avatar={
          <Avatar
            className={classes.avatar}
            src={`${serverRoutes?.IMAGE_LINK}/${
              data?.multimedia?.length > 0
                ? data?.multimedia[1]?.url
                : "images/2022/12/10/us/10Terror-Extradition-Mali/10Terror-Extradition-Mali-articleLarge.jpg"
            }`}
          />
        }
        title={`${
          data?.headline?.main
            ? data?.headline?.main.slice(0, 50) + "..."
            : data?.abstract
        }`}
        // subheader="September 14, 2016"
        subheader={
          data?.pub_date
            ? new Date(data?.pub_date).toString().slice(0, 15)
            : "September 14, 2016"
        }
      />
      <CardMedia
        className={classes.media}
        image={`${serverRoutes?.IMAGE_LINK}/${
          data?.multimedia?.length > 0
            ? data?.multimedia[0]?.url
            : "images/2022/12/10/us/10Terror-Extradition-Mali/10Terror-Extradition-Mali-articleLarge.jpg"
        }`}
        title="Paella dish"
      />

      <CardContent>
        <Typography
          variant="body2"
          color="textSecondary"
          component="p"
          className={classes.abstractText}
          style={{ height: "100px" }}
        >
          <span>
            {data?.byline?.original && "By: " + data?.byline?.original}{" "}
          </span>
          <br />
          {data?.abstract}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton
          aria-label="share"
          onClick={() => {
            data?.web_url && window.open(data?.web_url);
          }}
        >
          <ShareIcon />
        </IconButton>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Details:</Typography>

          <Typography paragraph>{data?.lead_paragraph}</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default Cards;
