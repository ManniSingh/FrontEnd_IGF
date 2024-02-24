import { LinearProgress } from "@mui/material";
import { useGetProductsQuery } from "../../services/api";
import { useDispatch } from "react-redux";
import { setProducts } from "../../redux/slices/productSlice";
import ProductGrid from "./ProductGrid";

function Products() {
  const { isUninitialized, isLoading, isError, data } = useGetProductsQuery({});
  const dispatch = useDispatch();

  if (isLoading || isUninitialized) {
    return <LinearProgress />;
  }

  if (isError) {
    return <p>ERROR!!</p>;
  }

  if(data){
      dispatch(setProducts(data.products));
  }
  return (
  <ProductGrid products={data.products} />
  );
}

export default Products;
