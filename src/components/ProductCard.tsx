// ProductCard.tsx
import React from "react";
import { CardContent } from "@mui/material";
import {
  StyledCard,
  ProductImage,
  ProductTitle,
  ProductDescription,
  ProductPrice,
} 

from "../styles/productCard";
import { ProductCardProps } from "../types/ProductTypes";

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <StyledCard>
      <CardContent>
        <ProductImage src={product.images[0]} alt={product.title} />
        <ProductTitle variant="h5" component="h2">
          {product.title}
        </ProductTitle>
        <ProductDescription variant="body2" color="textSecondary" component="p">
          {product.description}
        </ProductDescription>
        <ProductPrice variant="h6" component="p">
          ${product.price}
        </ProductPrice>
      </CardContent>
    </StyledCard>
  );
};

export default ProductCard;
