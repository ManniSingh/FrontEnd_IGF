import React, { useState, useEffect } from "react";
import { Button, LinearProgress, TextField } from "@mui/material";
import { useSearchProductQuery } from "../../services/api";
import { useDispatch } from "react-redux";
import { setProducts } from "../../redux/slices/productSlice";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [skip, setSkip] = useState(true);
  const { isLoading, isError, error, data } = useSearchProductQuery(searchQuery, { skip: skip });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (data) {
      dispatch(setProducts(data.products));
      navigate('/alt');
    }
  }, [data, dispatch, navigate]);

  const handleSearch = () => {
    setSkip(false);
  };

  return (
    <>
      <TextField
        label="Search"
        variant="outlined"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)} // Added onChange handler
        size="small"
        style={{
          fontSize: "10px",
          marginRight: "10px",
          width: "200px",
        }}
      />
      <Button variant="contained" onClick={handleSearch}>
        Search
      </Button>
      {isLoading && <LinearProgress />}
    </>
  );
};

export default SearchBar;
