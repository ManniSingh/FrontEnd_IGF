export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  images: string[];
  category: Category;
}

export interface Cart extends Product{
  amount:number;
}

interface Category {
  id:string;
  name:string;
  image:string;
}

export interface ProductCardProps {
  product: Product;
}
