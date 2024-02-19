import { Route, Routes } from 'react-router-dom'; 
import Products from './components/products/Products';
import { NavigationBar } from './components/root/NavigationBar';
import RegisterForm from './components/user/register';
import LoginForm from './components/user/login';
import UserProfilePage from './components/user/profile';

function App() {
  return (
    <>
      <NavigationBar />
      <div style={{ marginTop: '80px' }}>
      <Routes>
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/" element={<Products />} />
        <Route path="/profile" element={<UserProfilePage />} />
      </Routes>
      </div>
    </>
  );
}

export default App;
