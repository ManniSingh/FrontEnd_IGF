import React from "react";
import { useGetProductsQuery } from "./services/api";
import { Grid } from "@mui/material";
import ProductCard from "./components/ProductCard";

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
      <Grid container spacing={3}>
        {data.products.map((product: any) => (
          <Grid item key={product.id} xs={12} sm={6} md={4}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default App;
