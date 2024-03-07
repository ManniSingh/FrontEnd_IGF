import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Category, Product } from "../types/ProductTypes";
import { useCatProductsQuery } from "../services/api";
import { setProducts, setSelectedChips } from "../redux/slices/productSlice";

const useCategoryData = () => {
  const selectedChips = useSelector((state: RootState) => state.product.selectedChips);
  const [catID, setCatID] = useState(-1);
  const [chip, setChip] = useState("");
  const [productsDictionary, setProductsDictionary] = useState<{ [key: string]: Product[] }>({});
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(true);

  const {
    data: catData,
    isError: isCatError,
    error: catError,
  } = useCatProductsQuery(catID, { skip: (selectedChips.length>0)?false:true });

  // console.log("catID",catID);
  // console.log("catData",catData);
  // console.log("productsDict", productsDictionary);

  const handleClick = (_chip: string, categories: Category[]) => {
    if (!selectedChips.includes(_chip)) {
        const _catID = Number(categories.find((cat: Category) => cat.name === _chip)?.id) || -1;
        setCatID(_catID);
    }else{
        setProductsDictionary(prevState => {
            const updatedState = { ...prevState };
            if (updatedState[_chip]) {
                delete updatedState[_chip];
            }
            return updatedState;
        });
    }
    setChip(_chip);
    dispatch(setSelectedChips(_chip));
  };

  useEffect(() => {
    if (catData) {
      setProductsDictionary(prevState => {
        const updatedState = { ...prevState };
        return {
          ...updatedState,
          [chip]: catData.products
        };
      });
    }
  }, [catData]);

  useEffect(() => {
    const flattenedCollection = Object.values(productsDictionary).flat();
    dispatch(setProducts(flattenedCollection));
    setLoading(false);
  }, [dispatch, productsDictionary]);

  return {
    selectedChips,
    isLoading,
    isError: isCatError,
    error: catError,
    handleClick
  };
};

export default useCategoryData;
