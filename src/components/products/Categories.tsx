import React, { useContext, useEffect, useMemo, useState } from "react";
import { Chip, LinearProgress } from "@mui/material";
import { useCatProductsQuery, useGetCategoriesQuery } from "../../services/api";
import { useDispatch, useSelector } from "react-redux";
import { Category, Product } from "../../types/ProductTypes";
import { setProducts, setSelectedChips } from "../../redux/slices/productSlice";
import { useNavigate } from "react-router-dom";
import StyledContainer from "../../styles/container";
import { RootState } from "../../redux/store";
import ErrorComp from "../root/ErrorComp";
import ThemeContext from "../root/ThemeContext";

const HorizontalScrollableChips: React.FC = React.memo(() => {
  const { theme } = useContext(ThemeContext);
  const { data, isError, isLoading, error } = useGetCategoriesQuery({});
  const chips = useMemo(() => {
    return data?.categories
      .map((item: { name: string }) => item.name)
      .filter(
        (chip: string, index: number, array: string[]) =>
          array.indexOf(chip) === index
      );
  }, [data]);
  

  const selectedChips = useSelector(
    (state: RootState) => state.product.selectedChips
  );
  const [skip, setSkip] = useState(true);
  const [catID, setCatID] = useState(-1);
  const [chip, setChip] = useState("");
  const [productsDictionary, setProductsDictionary] = useState<{
    [key: string]: Product[];
  }>({});
  
  const {
    data: catData,
    isError: isCatError,
    isLoading: isCatLoading,
    error: catError,
  } = useCatProductsQuery(catID, { skip: skip });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = (_chip: string) => {
    const _catID = data.categories.find(
      (cat: Category) => cat.name === _chip
    ).id;
    console.log("Clicked:", _catID);
    setSkip(false);
    setCatID(_catID);
    setChip(_chip);
    dispatch(setSelectedChips(_chip));
  };

  useEffect(() => {
    if (catData) {
      console.log("in catData useEffect:", selectedChips);
      setProductsDictionary((prevState) => {
        const updatedState = { ...prevState };
        if (updatedState[chip]) {
          delete updatedState[chip];
          return updatedState;
        }
        return {
          ...updatedState,
          [chip]: catData.products,
        };
      });
    }
  }, [catData]);

  useEffect(() => {
    const flattenedCollection = Object.values(productsDictionary).flat();
    dispatch(setProducts(flattenedCollection));
    if (selectedChips.length > 0) {
      navigate("/alt");
    } else {
      if (!skip) {
        console.log("navigates");
        navigate("/");
      }
    }
  }, [productsDictionary]);


  // console.log("categories.tsx::", selectedChips, catID, catData);
  // console.log("chip:",chip);
  // console.log("prodDict:",productsDictionary);

  if (isLoading || isCatLoading) {
    console.log("loading");
    return <LinearProgress />;
  }

  if (isCatError) {
    return <ErrorComp error={JSON.stringify(catError)} />;
  }

  if (isError) {
    return <ErrorComp error={JSON.stringify(error)} />;
  }

  return (
    <StyledContainer
      style={{
        overflowX: "auto",
        whiteSpace: "nowrap",
        backgroundColor: theme === "light" ? "white" : "black",
      }}
    >
      {chips.map((chip: string, index: number) => (
        <Chip
          key={index}
          label={chip}
          variant={selectedChips.includes(chip) ? "filled" : "outlined"}
          onClick={() => handleClick(chip)}
          style={{
            marginRight: 8,
            marginBottom: 8,
            display: "inline-block",
            color: theme === "light" ? "#000" : "#fff",
            backgroundColor: theme === "light" ? "#fff" : "#000",
            border: theme === "light" ? "1px solid #000" : "1px solid #fff",
          }}
        />
      ))}
    </StyledContainer>
  );
});

export default HorizontalScrollableChips;
