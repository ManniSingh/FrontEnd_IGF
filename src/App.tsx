import { Route, Routes } from 'react-router-dom'; 
import Products from './components/products/Products';
import { NavigationBar } from './components/root/NavigationBar';
import RegisterForm from './components/user/register';
import LoginForm from './components/user/login';
import UserProfilePage from './components/user/profile';
import ProductGrid from './components/products/ProductGrid';
import { useSelector } from 'react-redux';
import { RootState } from './redux/store';
import HorizontalScrollableChips from './components/products/Categories';

function App() {
  const products = useSelector((state: RootState) => state.product.products);
  return (
    <>
      <NavigationBar />
      <div style={{ marginTop: '10px' }}>
      <HorizontalScrollableChips />
      <Routes>
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/" element={<Products />} />
        <Route path="/alt" element={<ProductGrid products={products} />} />
        <Route path="/profile" element={<UserProfilePage />} />
      </Routes>
      </div>
    </>
  );
}

export default App;
