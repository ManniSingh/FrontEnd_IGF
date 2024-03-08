import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom"; 
import { useSelector as useSelectorMock } from "react-redux";
import ProductDetail from "../components/products/ProductDetail";

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useSelector: jest.fn(),
}));

const useSelector = useSelectorMock as any; 

describe("ProductDetail Component", () => {
  beforeEach(() => {
    useSelector.mockReturnValue({
      id: 1,
      title: "Test Product",
      description: "This is a test product",
      images: ["test_image.jpg"],
      price: 10.99,
    });
  });

  test("renders product detail correctly", () => {
    render(
      <MemoryRouter initialEntries={["/product/1"]}>
        <Routes> 
          <Route path="/product/:productId" element={<ProductDetail />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText("Test Product")).toBeInTheDocument();
    expect(screen.getByText("This is a test product")).toBeInTheDocument();
    expect(screen.getByText("$10.99")).toBeInTheDocument();
  });

  test("renders loading state when product is null", () => {
    useSelector.mockReturnValue(null);

    render(
      <MemoryRouter initialEntries={["/product/1"]}>
        <Routes> 
          <Route path="/product/:productId" element={<ProductDetail />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });
});
