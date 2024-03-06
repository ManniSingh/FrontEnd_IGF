import React from "react";
import { useSelector } from "react-redux";
import { LinearProgress } from "@mui/material";
import { Product } from "../../types/ProductTypes"; // Assuming Product is the type of product
import { RootState } from "../../redux/store";
import { useNavigate } from "react-router-dom";
import {
  ProductDescription,
  ProductPrice,
  ProductTitle,
} from "../../styles/products";
import HomeButton from "../root/HomeButton";

const ProductDetail: React.FC = () => {
  const product: Product | null = useSelector(
    (state: RootState) => state.product.selectedProduct
  );
  const navigate = useNavigate();

  if (!product) {
    return <LinearProgress />;
  }

  return (
    <div>
      <ProductTitle>{product.title}</ProductTitle>
      <img src={product.images[0]} alt={product.title} />
      <ProductDescription>{product.description}</ProductDescription>
      <ProductPrice>${product.price}</ProductPrice>
      <HomeButton goHome={() => navigate("/")} />
    </div>
  );
};

export default ProductDetail;
