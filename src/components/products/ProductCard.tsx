import React from "react";
import { CardContent, IconButton } from "@mui/material";
import {
  StyledCard,
  ProductImage,
  ProductTitle,
  ProductDescription,
  ProductPrice,
  IconButtonContainer,
} from "../../styles/products";
import { ProductCardProps } from "../../types/ProductTypes";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart, selectProduct } from "../../redux/slices/productSlice";
import AddIcon from "@mui/icons-material/Add";

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = () => {
    dispatch(selectProduct(product.id));
    navigate("/product");
  };

  const handleAddToCartClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.stopPropagation();
    dispatch(addToCart(product));
  };

  return (
    <StyledCard onClick={handleClick}>
      <CardContent>
        <ProductImage src={product.images[0]} alt={product.title} />
        <ProductTitle>{product.title}</ProductTitle>
        <ProductDescription>{product.description}</ProductDescription>
        <ProductPrice>${product.price}</ProductPrice>
        <IconButtonContainer>
          <IconButton onClick={handleAddToCartClick} aria-label="add">
            <AddIcon />
          </IconButton>
        </IconButtonContainer>
      </CardContent>
    </StyledCard>
  );
};

export default ProductCard;
