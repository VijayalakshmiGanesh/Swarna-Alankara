import { Routes, Route } from 'react-router-dom';
import Mockman from 'mockman-js';
import 'react-toastify/dist/ReactToastify.css';

import './App.css';
import Header from './components/Header';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Wishlist from './pages/Wishlist';
import Footer from './components/Footer';
import Login from './pages/Login';
import SignUp from './pages/SignUpPage';
import { ToastContainer } from 'react-toastify';
import UserProfile from './pages/UserProfile';

function App() {
  return (
    <div className="App">
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/product-detail/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/apitest" element={<Mockman />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/user-profile" element={<UserProfile />} />
      </Routes>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        type="success"
      />
      <Footer />
    </div>
  );
}

export default App;
