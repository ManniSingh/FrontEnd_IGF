import React from 'react';
import { useSelector } from 'react-redux';
import { IconButton, LinearProgress, Typography } from "@mui/material";
import { Product } from "../../types/ProductTypes"; // Assuming Product is the type of product
import { RootState } from '../../redux/store';
import { useNavigate } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';

const ProductDetail: React.FC = () => {
    const product: Product | null = useSelector((state: RootState) => state.product.selectedProduct);
    const navigate = useNavigate();

  if (!product) {
    return <LinearProgress />;
  }

  return (
    <div>
      <Typography variant="h3">{product.title}</Typography>
      <img src={product.images[0]} alt={product.title} />
      <Typography variant="body1">{product.description}</Typography>
      <Typography variant="h5">${product.price}</Typography>
      <IconButton size="large" onClick={()=>navigate("/")}>
          {<HomeIcon color="primary"/>}
      </IconButton>
    </div>
  );
};

export default ProductDetail;

