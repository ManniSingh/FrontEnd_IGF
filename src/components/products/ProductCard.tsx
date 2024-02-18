import React from "react";
import { CardContent } from "@mui/material";
import { StyledCard, ProductImage, ProductTitle, ProductDescription, ProductPrice } from "../../styles/products";
import { ProductCardProps } from "../../types/ProductTypes";

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <StyledCard>
      <CardContent>
        <ProductImage src={product.images[0]} alt={product.title} />
        <ProductTitle>{product.title}</ProductTitle>
        <ProductDescription>{product.description}</ProductDescription>
        <ProductPrice>${product.price}</ProductPrice>
      </CardContent>
    </StyledCard>
  );
};

export default ProductCard;
