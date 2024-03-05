import React, { useEffect, useState } from "react";
import { Chip, LinearProgress } from "@mui/material";
import { useCatProductsQuery, useGetCategoriesQuery } from "../../services/api";
import { useDispatch, useSelector } from "react-redux";
import { Category } from "../../types/ProductTypes";
import { setProducts, setSelectedChips } from "../../redux/slices/productSlice";
import { useNavigate } from "react-router-dom";
import StyledContainer from "../../styles/container";
import { RootState } from "../../redux/store";

const HorizontalScrollableChips: React.FC = () => {
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

  const numChips = selectedChips.length;
  if (numChips > 0 && catData) {
    let collection = catData.products;
    if (numChips === 1) {
      console.log("disp 1:");
      dispatch(setProducts(collection));
    } else {
      console.log("disp 2:");
      dispatch(setProducts([...products, ...collection]));
    }
  }


  console.log("categories.tsx::", selectedChips, catID, catData);

  // useEffect(()=>{
  //   if(selectedChips.length>0){
  //     navigate("/alt");
  //   }else{
  //     navigate("/");
  //   }
  // },[selectedChips, navigate]);

  if (isLoading || isCatLoading) {
    return <LinearProgress />;
  }

  if (isCatError) {
    window.alert(catError);
  }

  if (isError) {
    window.alert(error);
  }

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
};

export default HorizontalScrollableChips;
