import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../../types/ProductTypes";

interface ProductState {
  products: Product[];
  selectedProduct: Product | null;
  sorted: number;
}

const initialState: ProductState = {
  products: [],
  selectedProduct: null,
  sorted: 0,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProducts(state, action: PayloadAction<Product[]>) {
      state.products = action.payload;
    },
    selectProduct(state, action: PayloadAction<string>) {
      state.selectedProduct =
        state.products.find((product) => product.id === action.payload) || null;
    },
    filterProductsByCategory(state, action: PayloadAction<string>) {
      state.products = state.products.filter(product => product.category.name === action.payload);
    },
    sortProductsByPrice(state) {
      if (state.sorted !== 1) {
        state.products.sort((a, b) => a.price - b.price);
        state.sorted = 1;
      } else {
        state.products.sort((a, b) => b.price - a.price);
        state.sorted = 2;
      }
    },
  },
});

const productReducer = productSlice.reducer;
export const { setProducts, selectProduct, sortProductsByPrice, filterProductsByCategory } =
  productSlice.actions;
export default productReducer;
