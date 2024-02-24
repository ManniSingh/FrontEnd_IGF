import { Button } from "@mui/material";
import { StyledGrid } from "../../styles/products";
import { Product } from "../../types/ProductTypes";
import ProductCard from "./ProductCard";
import { useNavigate } from "react-router-dom";

interface ProductGridProps {
  products: Product[];
}

const ProductGrid: React.FC<ProductGridProps> = ({ products }) => {
  const navigate = useNavigate();
  if (Object.keys(products).length === 0) {
    return (
      <>
        <p>No such product</p>
        <Button onClick={()=>navigate("/")}>Home</Button>
      </>
    );
  }
  return (
    <StyledGrid>
      {products.map((product: Product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </StyledGrid>
  );
};

export default ProductGrid;
