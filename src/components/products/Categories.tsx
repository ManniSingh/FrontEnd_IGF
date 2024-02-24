import React, { useState } from 'react';
import { Chip, Container, LinearProgress } from "@mui/material";
import { useGetCategoriesQuery, useGetProductsQuery } from "../../services/api";
// import { RootState } from '../../redux/store';
import { useDispatch} from 'react-redux';
import { Product } from '../../types/ProductTypes';
import { setProducts } from '../../redux/slices/productSlice';
import { useNavigate } from 'react-router-dom';

const HorizontalScrollableChips: React.FC = () => {
//   const products: Product[] = useSelector((state: RootState) => state.product.products);
  const { isLoading: isProdLoading, isError: isProdError, data: prodData } = useGetProductsQuery({});
  const { data, isError, isLoading, error } = useGetCategoriesQuery({});
  const [selectedChips, setSelectedChips] = useState<string[]>([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (isLoading || isProdLoading) {
    return <LinearProgress />;
  }

  const chips = data.categories.map((item: { name: string }) => item.name);

  const handleClick = (chip: string) => {

    let updatedSelectedChips: string[];

    if (selectedChips.includes(chip)) {
      updatedSelectedChips = selectedChips.filter(selectedChip => selectedChip !== chip);
    } else {
      updatedSelectedChips = [...selectedChips, chip];
    }
    setSelectedChips(updatedSelectedChips);
    console.log("chips:",updatedSelectedChips);
    if (updatedSelectedChips.length>0){
        let filteredProducts = prodData.products;
        for (const selectedChip of updatedSelectedChips) {
        filteredProducts = filteredProducts.filter((product: Product) => product.category.name === selectedChip);
        if (filteredProducts.length === 0) break;
        }
        dispatch(setProducts(filteredProducts));
        navigate("/alt");
    }else{
        navigate("/");
    }    
  };

  return (
    <Container>
      {chips.map((chip: string, index: number) => (
        <Chip
          key={index}
          label={chip}
          variant={selectedChips.includes(chip) ? "filled" : "outlined"}
          onClick={() => handleClick(chip)}
          style={{ marginRight: 8, marginBottom: 8 }}
        />
      ))}
    </Container>
  );
};

export default HorizontalScrollableChips;
