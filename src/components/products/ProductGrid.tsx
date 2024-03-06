import React, { useState } from "react";
import { Badge, Button, Drawer } from "@mui/material";
import { AddShoppingCart } from "@mui/icons-material";
import { StyledGrid } from "../../styles/products";
import ProductCard from "./ProductCard";
import { useNavigate } from "react-router-dom";
import Cartlist from "../cart/Cartlist";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { Cart } from "../../types/ProductTypes";
import { setCurrentPage } from "../../redux/slices/productSlice";
import HomeButton from "../root/HomeButton";

const ProductGrid = () => {
  const products = useSelector((state: RootState) => state.product.products);
  const cartItems = useSelector((state: RootState) => state.product.cart);
  const [cartOpen, setCartOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getTotalItems = (items: Cart[]) =>
    items.reduce((acc, item) => acc + item.amount, 0);

  const goHome = () => {
    dispatch(setCurrentPage(1));
    navigate("/");
  };

  return (
    <div style={{ position: "relative" }}>
      <Drawer anchor="right" open={cartOpen} onClose={() => setCartOpen(false)}>
        <Cartlist />
      </Drawer>

      <Button
        onClick={() => setCartOpen(true)}
        style={{
          position: "fixed",
          top: "120px",
          left: "10px",
          zIndex: 9999,
        }}
      >
        <Badge badgeContent={getTotalItems(cartItems)} color="error">
          <AddShoppingCart />
        </Badge>
      </Button>

      <StyledGrid>
        {products.map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </StyledGrid>

      <div style={{ position: "fixed", bottom: "20px", right: "20px" }}>
        <HomeButton goHome={goHome} />
      </div>
    </div>
  );
};

export default ProductGrid;
