import React from "react";
import { useGetProductsQuery } from "./services/api";
import ProductCard from "./components/ProductCard";
import { StyledGrid } from "./styles/productCard";

function App() {
  const { isUninitialized, isLoading, isError, data } = useGetProductsQuery();

  if (isLoading || isUninitialized) {
    return <p>loading...</p>;
  }

  if (isError) {
    return <p>ERROR!!</p>;
  }

  console.log("Type of data:", typeof data);
  console.log("Length of data:", data.length);
  console.log("Data:", data);

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

export default App;
