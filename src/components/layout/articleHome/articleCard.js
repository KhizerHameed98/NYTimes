import React, { Fragment } from "react";

import { Grid } from "@material-ui/core";
import Cards from "./loadCards";
import PaginationControlled from "../../Common/Pagination";
import NoRecordFound from "../../Common/NoRecordFound";

export default function ArticleCard({
  data,
  page,
  handleChange,
  totalCount,
  rowsPerPage,
}) {
  return (
    <Fragment>
      {data && data?.length > 0 ? (
        <>
          <Grid container spacing={4}>
            {data?.map((item, index) => {
              return (
                <Grid item key={index} xs={12} sm={6} md={4}>
                  <Cards data={item} />
                </Grid>
              );
            })}
          </Grid>
          <PaginationControlled
            page={page}
            handleChange={handleChange}
            totalCount={totalCount}
            rowsPerPage={10}
          />
        </>
      ) : (
        <NoRecordFound />
      )}
    </Fragment>
  );
}
