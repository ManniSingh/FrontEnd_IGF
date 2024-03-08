import { EnhancedStore, configureStore } from "@reduxjs/toolkit";
import productReducer, { setProducts, selectProduct, sortProductsByPrice, addToCart, removeFromCart, setCurrentPage, setSelectedChips } from "../redux/slices/productSlice";
import { mockProducts } from "./mockdata";

describe("productSlice", () => {
    let store: EnhancedStore;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        product: productReducer,
      },
    });
  });

  it("should set products correctly", () => {
    const products = mockProducts;
    store.dispatch(setProducts(products));
    const state = store.getState().product;
    expect(state.products).toEqual(products);
  });

  it("should select product correctly", () => {
    const products = mockProducts;
    store.dispatch(setProducts(products));
    store.dispatch(selectProduct("1"));
    const state = store.getState().product;
    expect(state.selectedProduct).toEqual(products[0]);
  });

  it("should add product to cart correctly", () => {
    const product = mockProducts[0];
    store.dispatch(addToCart(product));
    let state = store.getState().product;
    expect(state.cart).toEqual([{ ...product, amount: 1 }]);
    store.dispatch(addToCart(product));
    state = store.getState().product;
    expect(state.cart).toEqual([{ ...product, amount: 2 }]);
  });

  it("should set current page correctly", () => {
    store.dispatch(setCurrentPage(2));
    const state = store.getState().product;
    expect(state.currentPage).toEqual(2);
  });

  it("should set selected chips correctly", () => {
    store.dispatch(setSelectedChips("chip1"));
    let state = store.getState().product;
    expect(state.selectedChips).toEqual(["chip1"]);
    store.dispatch(setSelectedChips("chip2"));
    state = store.getState().product;
    expect(state.selectedChips).toEqual(["chip1", "chip2"]);
    store.dispatch(setSelectedChips("chip1"));
    state = store.getState().product;
    expect(state.selectedChips).toEqual(["chip2"]);
  });
});
