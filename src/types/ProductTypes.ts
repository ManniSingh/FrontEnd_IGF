export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  images: string[];
  category: Category;
}

interface Category {
  id:string;
  name:string;
  image:string;
}

export interface ProductCardProps {
  product: Product;
}
