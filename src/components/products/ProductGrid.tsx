import { StyledGrid } from "../../styles/products";
import { Product } from "../../types/ProductTypes";
import ProductCard from "./ProductCard";

interface ProductGridProps {
  products: Product[]; 
}

const ProductGrid: React.FC<ProductGridProps> = ({ products }) => {
  return (
    <StyledGrid>
      {products.map((product: Product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </StyledGrid>
  );
};

export default ProductGrid;
