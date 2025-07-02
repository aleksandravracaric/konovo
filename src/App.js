import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import ProductsPage from './components/ProductsPage';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<LoginPage />} />
          <Route path='/' element={<ProductsPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
