import React, { useState } from "react";
import { Badge, Button, Drawer, IconButton, TextField } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import { AddShoppingCart } from "@mui/icons-material";
import { StyledGrid } from "../../styles/products";
import { Cart, Product } from "../../types/ProductTypes";
import ProductCard from "./ProductCard";
import { useNavigate } from "react-router-dom";
import Cartlist from "../cart/Cartlist";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

interface ProductGridProps {
  products: Product[];
}

const ProductGrid: React.FC<ProductGridProps> = ({ products }) => {
  const cartItems = useSelector((state: RootState) => state.product.cart);
  const [cartOpen, setCartOpen] = useState(false);
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredProducts = products.filter((product: Product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearchInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchQuery(event.target.value);
  };

  const getTotalItems = (items: Cart[]) =>
    items.reduce((acc, item) => acc + item.amount, 0);

  return (
    <div style={{ position: "relative" }}>
      <TextField
        fullWidth
        label="Search"
        variant="outlined"
        value={searchQuery}
        onChange={handleSearchInputChange}
        size="small"
        style={{
          position: "fixed",
          top: "110px",
          left: "10px",
          zIndex: 999,
          fontSize: "10px",
          maxWidth: "calc(100vw - 20px)",
        }}
      />

      <Drawer anchor="right" open={cartOpen} onClose={() => setCartOpen(false)}>
        <Cartlist />
      </Drawer>

      <Button
        onClick={() => setCartOpen(true)}
        style={{
          position: "fixed", 
          top: "70px",
          right: "10px",
          zIndex: 9999, 
        }}
      >
        <Badge badgeContent={getTotalItems(cartItems)} color="error">
          <AddShoppingCart />
        </Badge>
      </Button>

      <StyledGrid>
        {filteredProducts.map((product: Product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </StyledGrid>

      {filteredProducts.length === 0 && (
        <IconButton size="large" onClick={() => navigate("/")}>
          {<HomeIcon color="primary" />}
        </IconButton>
      )}
    </div>
  );
};

export default ProductGrid;
