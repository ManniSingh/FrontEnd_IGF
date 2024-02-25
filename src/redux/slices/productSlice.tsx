import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Cart, Product } from "../../types/ProductTypes";

interface ProductState {
  products: Product[];
  selectedProduct: Product | null;
  sorted: number;
  cart: Cart[];
}

const initialState: ProductState = {
  products: [],
  selectedProduct: null,
  sorted: 0,
  cart: [],
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
    sortProductsByPrice(state) {
      if (state.sorted !== 1) {
        state.products.sort((a, b) => a.price - b.price);
        state.sorted = 1;
      } else {
        state.products.sort((a, b) => b.price - a.price);
        state.sorted = 2;
      }
    },
    addToCart(state, action: PayloadAction<Product>) {
      const clickedItem = action.payload;
      const isItemInCart = state.cart.find((item) => item.id === clickedItem.id);
      if (isItemInCart) {
        state.cart = state.cart.map((item) =>
          item.id === clickedItem.id
            ? { ...item, amount: item.amount + 1 }
            : item
        );
      } else {
        state.cart = [...state.cart, { ...clickedItem, amount: 1 }];
      }
    },
    removeFromCart(state, action: PayloadAction<string>) {
      const idToRemove = action.payload;
      const itemToRemove = state.cart.find((item) => item.id === idToRemove);
      if (itemToRemove) {
        if (itemToRemove.amount === 1) {
          state.cart = state.cart.filter((item) => item.id !== idToRemove);
        } else {
          state.cart = state.cart.map((item) =>
            item.id === idToRemove
              ? { ...item, amount: item.amount - 1 }
              : item
          );
        }
      }
    },
  },
});

const productReducer = productSlice.reducer;
export const { setProducts, selectProduct, sortProductsByPrice, addToCart, removeFromCart} =
  productSlice.actions;
export default productReducer;
