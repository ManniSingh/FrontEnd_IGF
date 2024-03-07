import { IconButton, LinearProgress } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";

import {
  setCurrentPage,
  setProducts as setStoreProducts,
} from "../../redux/slices/productSlice";
import ProductGrid from "./ProductGrid";
import { useGetProductsPageQuery } from "../../services/api";
import { RootState } from "../../redux/store";
import ErrorComp from "../root/ErrorComp";

function Products() {
  const currentPage = useSelector(
    (state: RootState) => state.product.currentPage
  );
  const { isLoading, isError, error, data } =
    useGetProductsPageQuery(currentPage);
  const dispatch = useDispatch();

  if (isLoading) {
    return <LinearProgress />;
  }

  if (isError) {
    return <ErrorComp error={JSON.stringify(error)} />;
  }

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      dispatch(setCurrentPage(currentPage - 1));
    }
  };

  const handleNextPage = () => {
    if (data.products.length > 0) {
      dispatch(setCurrentPage(currentPage + 1));
    }
  };

  // console.log("Page:", currentPage, "data:", data.products.length);
  dispatch(setStoreProducts(data.products));

  return (
    <div style={{ position: "relative", minHeight: "100vh" }}>
      <ProductGrid />
      <div style={{ position: "fixed", bottom: "20px", left: "20px" }}>
        <IconButton disabled={currentPage === 1} onClick={handlePreviousPage}>
          <ArrowBackIos />
        </IconButton>
        <IconButton
          disabled={data.products.length === 0}
          onClick={handleNextPage}
        >
          <ArrowForwardIos />
        </IconButton>
      </div>
    </div>
  );
}

export default Products;
