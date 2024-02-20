import { LinearProgress } from "@mui/material";
import { useGetProductsQuery } from "../../services/api";
import { StyledGrid } from "../../styles/products";
import ProductCard from "./ProductCard";
import { useDispatch } from "react-redux";
import { setProducts } from "../../redux/slices/productSlice";

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
    <div>
      <StyledGrid>
        {data.products.map((product: any) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </StyledGrid>
    </div>
  );
}

export default Products;
