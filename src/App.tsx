import { Route, Routes } from "react-router-dom";
import Products from "./components/products/Products";
import { NavigationBar } from "./components/root/NavigationBar";
import RegisterForm from "./components/user/register";
import LoginForm from "./components/user/login";
import UserProfilePage from "./components/user/profile";
import ProductGrid from "./components/products/ProductGrid";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";
import HorizontalScrollableChips from "./components/products/Categories";
import ProductDetail from "./components/products/ProductDetail";
import Settings from "./components/admin/Settings";
import { useContext } from "react";
import ThemeContext from "./components/root/ThemeContext";

function App() {
  const { theme } = useContext(ThemeContext);
  const products = useSelector((state: RootState) => state.product.products);
  const userData = useSelector((state: RootState) => state.user.user);
  return (
    <div style={{ backgroundColor: theme === "light" ? "white" : "black" }}>
      <NavigationBar />
      <HorizontalScrollableChips />
      <div style={{ marginTop: "155px" }}>
        <Routes>
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/" element={<Products />} />
          <Route path="/product" element={<ProductDetail />} />
          <Route path="/alt" element={<ProductGrid products={products} />} />
          <Route path="/profile" element={<UserProfilePage />} />
          {userData?.role === "customer" && (
            <Route path="/admin" element={<Settings />} />
          )}
        </Routes>
      </div>
    </div>
  );
}

export default App;
