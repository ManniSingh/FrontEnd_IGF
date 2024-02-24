import React from "react";
import { CardContent } from "@mui/material";
import { StyledCard, ProductImage, ProductTitle, ProductDescription, ProductPrice } from "../../styles/products";
import { ProductCardProps } from "../../types/ProductTypes";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { selectProduct } from "../../redux/slices/productSlice";


const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleClick = () => {
    dispatch(selectProduct(product.id));
    navigate("/product");
  };
  return (
    <StyledCard onClick={handleClick}>
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
