import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { InputField } from "../../styles/login";

interface FormValues {
  id: string;
}

interface DeleteProductFormProps {
  onSubmit: (id: string) => void;
}

const DeleteProductForm: React.FC<DeleteProductFormProps> = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const handleFormSubmit: SubmitHandler<FormValues> = (data) => {
    onSubmit(data.id);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <InputField
        label="ID"
        type="text"
        {...register("id", { required: true })}
        error={!!errors.id}
        helperText={errors.id ? "ID is required" : ""}
      />

      <button type="submit">Delete Product</button>
    </form>
  );
};

export default DeleteProductForm;
