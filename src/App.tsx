import { Route, Routes } from 'react-router-dom'; 
import LoginForm from './components/user/login';
import Products from './components/products/Products';
import { NavigationBar } from './components/NavigationBar';

function App() {
  return (
    <>
      <NavigationBar />
      <div style={{ marginTop: '80px' }}>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/" element={<Products />} />
      </Routes>
      </div>
    </>
  );
}

export default App;
