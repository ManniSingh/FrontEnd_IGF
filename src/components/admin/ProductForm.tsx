import React, { useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { InputField } from "../../styles/login";
import { Product, Category, _Product } from "../../types/ProductTypes";
import { useGetCategoriesQuery } from "../../services/api";
import { LinearProgress } from "@mui/material";

interface ProductFormProps {
  onSubmit: (data: _Product) => void;
  product?: Product;
}

const ProductForm: React.FC<ProductFormProps> = ({ onSubmit, product }) => {
  const { data, isError, isLoading, error } = useGetCategoriesQuery({});
  const {
    register,
    control,
    handleSubmit,
    setValue,
    reset,
    clearErrors,
    formState: { errors },
  } = useForm<_Product>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "_images",
  });

  useEffect(() => {
    if (product) {
      clearErrors();
      setValue("title", product.title);
      setValue("price", product.price);
      setValue("description", product.description);
      setValue("categoryId", product.category.id);
      reset({ _images: [] });
      product.images.forEach((image, index) => {
        setValue(`_images.${index}.image`, image);
      });
    } else {
      clearErrors();
      reset();
    }
  }, [product, setValue, clearErrors, reset]);
  

  if (isLoading) {
    return <LinearProgress />;
  }

  const getCategory = (categoryId: string): Category | null => {
    return (
      data.categories.find(
        (category: Category) => category.id === categoryId
      ) || null
    );
  };

  const handleFormSubmit = (data: _Product) => {
    const category = getCategory(data.categoryId);
    if (category) {
      onSubmit(data);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <InputField
        label="Title"
        type="text"
        {...register("title", { required: true })}
        error={!!errors.title}
        helperText={errors.title ? "Title is required" : ""}
        InputLabelProps={{
          shrink: !!product?.title,
        }}
      />

      <InputField
        label="Price"
        type="number"
        {...register("price", { required: true })}
        error={!!errors.price}
        helperText={errors.price ? "Price is required" : ""}
        InputLabelProps={{
          shrink: !!product?.price,
        }}
      />

      <InputField
        label="Description"
        type="text"
        {...register("description", { required: true })}
        error={!!errors.description}
        helperText={errors.description ? "Description is required" : ""}
        InputLabelProps={{
          shrink: !!product?.description,
        }}
      />

      <InputField
        label="Category ID"
        type="number"
        {...register("categoryId", { required: true })}
        error={!!errors.categoryId}
        helperText={errors.categoryId ? "Category ID is required" : ""}
        InputLabelProps={{
            shrink: !!product?.category,
          }}
      />

      {fields.map((item, index) => (
        <div key={item.id}>
          <InputField
            label={`Image ${index + 1}`}
            type="text"
            {...register(`_images.${index}.image`, {
              required: true,
              pattern: {
                value: /^(ftp|http|https):\/\/[^ "]+$/,
                message: "Please enter a valid URL",
              },
            })}
            error={!!errors._images?.[index]?.image}
            helperText={
              errors._images?.[index]?.image
                ? errors._images[index]?.image?.message ?? ""
                : ""
            }
          />
          <button type="button" onClick={() => remove(index)}>
            Remove Image
          </button>
        </div>
      ))}
      <button type="button" onClick={() => append({ image: "" })}>
        Add Image
      </button>

      <button type="submit">
        {product ? "Update Product" : "Add Product"}
      </button>
    </form>
  );
};

export default ProductForm;
