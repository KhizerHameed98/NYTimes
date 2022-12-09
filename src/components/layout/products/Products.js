import React, { useEffect, useState } from "react";
import Product from "./Product";
import { useSelector, useDispatch } from "react-redux";
import Error from "./Error";
import Pagination from "./Pagination";
import Metadata from "./Metadata";
import Search from "./Search";
import { loadProductsCount } from "../../../store/user/products";

const Products = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadProductsCount());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const { list, count, loading } = useSelector(
    (state) => state.entities.products
  );

  const [data, setData] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 12, 13, 14]);

  return (
    <>
      <Metadata title="Products" />
      <Search />

      <div className="container minHeight">
        <div className="row">
          {data.map((product, index) => (
            <Product
              key={index}
              id={index}
              price={0}
              reviews={2}
              name={"hello" + index}
              rating={10}
              wide="col-md-4"
              url={
                "https://static01.nyt.com/images/2022/12/07/multimedia/07pol-ga-assess-01-1-e7db/07pol-ga-assess-01-1-e7db-threeByTwoSmallAt2X.jpg"
              }
            />
          ))}
        </div>
      </div>

      <Pagination />
    </>
  );
};

export default Products;
