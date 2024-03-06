import React from "react";
import ProductForm from "./ProductForm";
import {
  useAddProductMutation,
  useUpdateProductMutation,
} from "../../services/api";
import { Product, _Product } from "../../types/ProductTypes";
import { LinearProgress } from "@mui/material";
import ErrorComp from "../root/ErrorComp";

interface ProductFormContainerProps {
  product?: Product;
}

const ProductFormContainer: React.FC<ProductFormContainerProps> = ({
  product,
}) => {
  const [addProductMutation, { isLoading: isAddingProduct }] =
    useAddProductMutation();
  const [updateProductMutation, { isLoading: isUpdatingProduct }] =
    useUpdateProductMutation();

  interface UpResult {
    data?: Product;
    error?: unknown;
  }

  const onSubmit = async (data: _Product) => {
    const { _images, ...rest } = data;
    const newImages = _images.map((item) => item.image);
    const _data = { ...rest, images: newImages };
    let result: UpResult;
    if (product) {
      //console.log("data:",_data);
      result = await updateProductMutation({ id: product.id, changes: _data });
    } else {
      result = await addProductMutation(_data);
    }
    if (result.error) {
      return <ErrorComp error={JSON.stringify(result.error)} />;
    }
  };

  const isLoading = isUpdatingProduct || isAddingProduct;

  return (
    <>
      {isLoading ? (
        <LinearProgress />
      ) : (
        <ProductForm onSubmit={onSubmit} product={product} />
      )}
    </>
  );
};

export default ProductFormContainer;
