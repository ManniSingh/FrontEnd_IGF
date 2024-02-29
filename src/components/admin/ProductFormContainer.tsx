import React from "react";
import ProductForm from "./ProductForm";
import { useAddProductMutation, useUpdateProductMutation} from "../../services/api"; 
import { Product, _Product } from "../../types/ProductTypes"; 
import { LinearProgress } from "@mui/material";

interface ProductFormContainerProps {
  product?: Product;
}

const ProductFormContainer: React.FC<ProductFormContainerProps> = ({ product }) => {
  
  const [addProductMutation, { isLoading: isAddingProduct }] = useAddProductMutation();
  const [updateProductMutation, { isLoading: isUpdatingProduct }] = useUpdateProductMutation();

  const onSubmit = async (data: _Product) => {
    const {_images, ...rest } = data;
    const newImages = _images.map((item) => item.image);
    const _data = { ...rest, images: newImages }
    try {
       if (product) {
        const result = await updateProductMutation({ id: product.id, changes: _data });
        console.log(result);
      }
      else {
        console.log("sending:",_data);
        const result = await addProductMutation(_data);
        console.log(result);
      }
    } catch (error) {
      alert("Error occurred while submitting the form!");
      console.error(error);
    }
  };

  const isLoading = isUpdatingProduct || isAddingProduct;

  return (
    <>
      {isLoading ? (
        <LinearProgress />
      ) : (
        <ProductForm
          onSubmit={onSubmit}
          product={product} 
        />
      )}
    </>
  );
};

export default ProductFormContainer;
