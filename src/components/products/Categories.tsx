import React, { useContext, useEffect, useMemo } from "react";
import { Chip, LinearProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import StyledContainer from "../../styles/container";
import ErrorComp from "../root/ErrorComp";
import ThemeContext from "../root/ThemeContext";
import useCategoryData from "../../hooks/useCategoryData";
import { useGetCategoriesQuery } from "../../services/api";

const HorizontalScrollableChips: React.FC = React.memo(() => {
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate();
  const { data, isError, isLoading, error } = useGetCategoriesQuery({});
  const {
    selectedChips,
    isLoading: isCatLoading,
    isError: isCatError,
    error: catError,
    handleClick,
  } = useCategoryData();

  const chips = useMemo(() => {
    return data?.categories
      .map((item: { name: string }) => item.name)
      .filter(
        (chip: string, index: number, array: string[]) =>
          array.indexOf(chip) === index
      );
  }, [data]);

  useEffect(() => {
    // console.log("navigating");
    if (selectedChips.length > 0) {
      navigate("/alt");
    }
    else{
      // console.log("going back");
      navigate("/");
    }
  }, [selectedChips]);


  if (isLoading || isCatLoading) {
    // console.log("loading");
    return <LinearProgress />;
  }

  if (isError) {
    return <ErrorComp error={JSON.stringify(error)} />;
  }

  if (isCatError){
    return <ErrorComp error={JSON.stringify(catError)} />;
  }

  // console.log("selectedChips:", selectedChips);

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
          onClick={() => handleClick(chip, data.categories)}
          color = {theme === "light" ? "primary" : "secondary"}
        />
      ))}
    </StyledContainer>
  );
});

export default HorizontalScrollableChips;
