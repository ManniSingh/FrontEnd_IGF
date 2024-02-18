import { LinearProgress } from "@mui/material";
import { useGetProductsQuery } from "../../services/api";
import { StyledGrid } from "../../styles/products";
import ProductCard from "./ProductCard";

function Products() {
  const { isUninitialized, isLoading, isError, data } = useGetProductsQuery({});

  if (isLoading || isUninitialized) {
    return <LinearProgress />;
  }

  if (isError) {
    return <p>ERROR!!</p>;
  }

  // console.log("Type of data:", typeof data);
  // console.log("Data:", data);

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
