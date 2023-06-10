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
import RequiresAuth from './components/RequiresAuth';
import Checkout from './pages/Checkout';
import OrderSummary from './pages/OrderSummary';
import { useDataContext } from './contexts/DataContext';
import { useContext, useEffect } from 'react';
import { AuthContext } from './contexts/AuthContext';
import { getAddressFromAPI } from './services/address';

function App() {
  const { datadispatch } = useDataContext();
  const { isUserLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    getAddressFromAPI(datadispatch);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isUserLoggedIn]);
  return (
    <div className="App">
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/product-detail/:id" element={<ProductDetail />} />
        <Route
          path="/cart"
          element={
            <RequiresAuth>
              <Cart />
            </RequiresAuth>
          }
        />
        <Route
          path="/wishlist"
          element={
            <RequiresAuth>
              <Wishlist />
            </RequiresAuth>
          }
        />
        <Route path="/apitest" element={<Mockman />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/user-profile"
          element={
            <RequiresAuth>
              <UserProfile />
            </RequiresAuth>
          }
        />
        <Route
          path="/checkout"
          element={
            <RequiresAuth>
              <Checkout />
            </RequiresAuth>
          }
        />
        <Route
          path="/orderSummary"
          element={
            <RequiresAuth>
              <OrderSummary />
            </RequiresAuth>
          }
        />
        <Route path="*" element={<Home />} />
      </Routes>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
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
