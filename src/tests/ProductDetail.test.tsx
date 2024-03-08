import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom"; // Import Routes
import { useSelector as useSelectorMock } from "react-redux";
import ProductDetail from "../components/products/ProductDetail";

// Mock the react-redux useSelector hook
jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useSelector: jest.fn(),
}));

const useSelector = useSelectorMock as any; // Type assertion

describe("ProductDetail Component", () => {
  beforeEach(() => {
    // Mock useSelector to return a product object
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
        <Routes> {/* Wrap the Route component in Routes */}
          <Route path="/product/:productId" element={<ProductDetail />} />
        </Routes>
      </MemoryRouter>
    );

    // Check if the product details are rendered correctly
    expect(screen.getByText("Test Product")).toBeInTheDocument();
    expect(screen.getByText("This is a test product")).toBeInTheDocument();
    expect(screen.getByText("$10.99")).toBeInTheDocument();
  });

  test("renders loading state when product is null", () => {
    // Mock useSelector to return null
    useSelector.mockReturnValue(null);

    render(
      <MemoryRouter initialEntries={["/product/1"]}>
        <Routes> {/* Wrap the Route component in Routes */}
          <Route path="/product/:productId" element={<ProductDetail />} />
        </Routes>
      </MemoryRouter>
    );

    // Check if the loading state (LinearProgress) is rendered
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });
});
