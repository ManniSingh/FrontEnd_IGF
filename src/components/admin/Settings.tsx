import React, { useState, useEffect } from "react";
import ProductFormContainer from "./ProductFormContainer";
import { useDeleteProductMutation, useGetProductsQuery } from "../../services/api";
import { Product } from "../../types/ProductTypes";

const Settings: React.FC = () => {
  const { data: products, isLoading, isError } = useGetProductsQuery({});
  const [selectedProductId, setSelectedProductId] = useState<string | undefined>("");
  const [deleteProduct] = useDeleteProductMutation();

  const handleDeleteProduct = async () => {
    if (!selectedProductId) {
      console.error("Please select a product to delete.");
      return;
    }

    console.log(`Deleting product with ID: ${selectedProductId}`);
    try {
      const response = await deleteProduct(selectedProductId);
      console.log("Product deleted successfully", response);
    } catch (error) {
      console.error("Error deleting product", error);
    }
    setSelectedProductId("");
  };

  useEffect(() => {
    if (products) {
      setSelectedProductId(products[0]?.id || "");
    }
  }, [products]);

  const handleProductIdChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedProductId(event.target.value);
  };

  const selectedProduct = selectedProductId && products?.products.find((product:Product) => product.id === selectedProductId);

  return (
    <>
      {isLoading ? (
        <p>Loading products...</p>
      ) : isError ? (
        <p>Error fetching products</p>
      ) : (
        <>
          <select value={selectedProductId} onChange={handleProductIdChange}>
            {products?.products.map((product: Product) => (
              <option key={product.id} value={product.id}>
                {product.id} - {product.title}
              </option>
            ))}
          </select>
          <button onClick={()=>setSelectedProductId("")} disabled={!selectedProductId}>
            Clear Selection
          </button>
          {selectedProduct && (
            <div>
              <h1>Delete Product</h1>
              <button onClick={handleDeleteProduct}>Delete Product</button>

              <h1>Product UPDATE</h1>
              <ProductFormContainer product={selectedProduct} />
            </div>
          )}

          {!selectedProduct && (
            <div>
              <h1>Product ADD</h1>
              <ProductFormContainer />
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Settings;
