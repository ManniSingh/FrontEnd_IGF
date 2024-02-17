export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  images: string[];
}

export interface ProductCardProps {
  product: Product;
}
