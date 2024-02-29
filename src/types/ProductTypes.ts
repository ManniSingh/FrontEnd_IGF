export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  images: string[];
  category: Category;
}

interface Image {
  image: string;
}

export interface _Product extends Product {
  categoryId: string;
  _images: Array<Image>;
}

export interface Cart extends Product{
  amount:number;
}

export interface Category {
  id:string;
  name:string;
  image:string;
}

export interface ProductCardProps {
  product: Product;
}
