import React, { useState } from 'react';
import { IconButton, TextField } from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import { StyledGrid } from "../../styles/products";
import { Product } from "../../types/ProductTypes";
import ProductCard from "./ProductCard";
import { useNavigate } from "react-router-dom";

interface ProductGridProps {
  products: Product[];
}

const ProductGrid: React.FC<ProductGridProps> = ({ products }) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredProducts = products.filter((product: Product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  if (filteredProducts.length === 0) {
    return (
      <>
        <p>No such product</p>
        <IconButton size="large" onClick={()=>navigate("/")}>
          {<HomeIcon color="primary"/>}
        </IconButton>
      </>
    );
  }

  return (
    <div>
      <TextField
        fullWidth
        label="Search"
        variant="outlined"
        value={searchQuery}
        onChange={handleSearchInputChange}
      />
      <StyledGrid>
        {filteredProducts.map((product: Product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </StyledGrid>
    </div>
  );
};

export default ProductGrid;
