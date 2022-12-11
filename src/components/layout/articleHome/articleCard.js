import React, { Fragment, useEffect, useState } from "react";

import { Grid } from "@material-ui/core";
import Cards from "./loadCards";

export default function ArticleCard({ data }) {
  return (
    <Fragment>
      {data && data?.length > 0
        ? data?.map((item, index) => {
            return (
              <Grid item key={index} xs={12} sm={6} md={4}>
                <Cards data={item} />
              </Grid>
            );
          })
        : null}
    </Fragment>
  );
}
