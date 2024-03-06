import React, { useEffect, useState } from "react";
import { Chip, LinearProgress } from "@mui/material";
import { useCatProductsQuery, useGetCategoriesQuery } from "../../services/api";
import { useDispatch, useSelector } from "react-redux";
import { Category } from "../../types/ProductTypes";
import { setProducts, setSelectedChips } from "../../redux/slices/productSlice";
import { useNavigate } from "react-router-dom";
import StyledContainer from "../../styles/container";
import { RootState } from "../../redux/store";
import ErrorComp from "../root/ErrorComp";

const HorizontalScrollableChips: React.FC = React.memo(() => {
  const selectedChips = useSelector((state: RootState) => state.product.selectedChips);
  const products = useSelector((state: RootState) => state.product.products);

  const [skip, setSkip] = useState(true);
  const [catID, setCatID] = useState(-1);
  const { data, isError, isLoading, error } = useGetCategoriesQuery({});
  const {
    data: catData,
    isError: isCatError,
    isLoading: isCatLoading,
    error: catError,
  } = useCatProductsQuery(catID, { skip: skip });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const chips = data?.categories
    .map((item: { name: string }) => item.name)
    .filter(
      (chip: string, index: number, array: string[]) =>
        array.indexOf(chip) === index
    );

  const handleClick = (chip: string) => {
    const _catID = data.categories.find(
      (cat: Category) => cat.name === chip
    ).id;
    setSkip(false);
    setCatID(_catID);
    dispatch(setSelectedChips(chip));
  };

  useEffect(() => {
    const numChips = selectedChips.length;
    if (catData) {
      let collection = catData.products;
      if (numChips === 1) {
        dispatch(setProducts(collection));
      } else {
        console.log("Infinite loop starts:");
        dispatch(setProducts([...products, ...collection]));
      }
    }
    if (numChips > 0) {
      navigate("/alt"); 
    } else {
      if(!skip){
        console.log("navigates");
        navigate("/"); 
      }
    }
  }, [selectedChips]);

  if (isLoading || isCatLoading) {
    return <LinearProgress />;
  }

  if (isCatError) {
    return <ErrorComp error={JSON.stringify(catError)}/>
  }

  if (isError) {
    return <ErrorComp error={JSON.stringify(error)}/>
  }

  console.log("categories.tsx::", selectedChips, catID, catData);

  return (
    <StyledContainer style={{ overflowX: "auto", whiteSpace: "nowrap" }}>
      {chips.map((chip: string, index: number) => (
        <Chip
          key={index}
          label={chip}
          variant={selectedChips.includes(chip) ? "filled" : "outlined"}
          onClick={() => handleClick(chip)}
          style={{ marginRight: 8, marginBottom: 8, display: "inline-block" }}
        />
      ))}
    </StyledContainer>
  );
});

export default HorizontalScrollableChips;
