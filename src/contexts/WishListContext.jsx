import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { AuthContext } from './AuthContext';
import { CartContext } from './CartContext';
import Alerts from '../components/Alerts';

export const WishListContext = createContext();

export const WishListProvider = ({ children }) => {
  const [itemsInWishList, setItemsinWishList] = useState([]);
  const navigate = useNavigate();
  const { isUserLoggedIn } = useContext(AuthContext);
  const { addItemToCart, removeItemFromCart } = useContext(CartContext);
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const getWishlistItems = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/user/wishlist', {
        method: 'GET',
        headers: {
          authorization: localStorage.getItem('key'),
        },
      });

      if (response.status === 200) {
        setItemsinWishList(JSON.parse(response._bodyInit).wishlist);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getWishlistItems();
  }, []);
  function callAlert(msg) {
    console.log('called');
    console.log('show alert', showAlert);
    console.log(msg);
    return <Alerts message={msg} />;
  }
  const isItemInWishlist = idToFind =>
    itemsInWishList.findIndex(({ _id }) => _id === idToFind);

  const addItemToWishlist = async productToAddWishlist => {
    const isItemFound = isItemInWishlist(productToAddWishlist._id);
    if (isItemFound === -1) {
      setLoading(true);
      try {
        const response = await fetch('/api/user/wishlist', {
          method: 'POST',
          headers: {
            authorization: localStorage.getItem('key'),
          },
          body: JSON.stringify({ product: productToAddWishlist }),
        });
        if (response.status === 201) {
          setShowAlert(true);
        }
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    } else {
      navigate('/wishlist');
    }
    getWishlistItems();
  };
  useEffect(() => {
    callAlert('Product added to wishlist');
  }, [callAlert, showAlert]);

  function AddToWishlistHander(producttoAddinWishlist) {
    if (isUserLoggedIn) {
      addItemToWishlist(producttoAddinWishlist);
    } else {
      navigate('/login');
    }
  }

  const removeItemFromWishlist = async productToBeRemovedFromWishlistID => {
    setLoading(true);
    try {
      const response = await fetch(
        `/api/user/wishlist/${productToBeRemovedFromWishlistID}`,
        {
          method: 'DELETE',
          headers: {
            authorization: localStorage.getItem('key'),
          },
        }
      );
      if (response.status === 201) {
        setShowAlert(true);
        callAlert('Product removed from wishlist');
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
    getWishlistItems();
  };

  const MoveToCartFromWishList = productToBeMoved => {
    removeItemFromWishlist(productToBeMoved._id);
    addItemToCart(productToBeMoved);
    setShowAlert(true);
    callAlert('Product moved to Cart');
  };

  const MoveToWishListFromCart = productToBeMoved => {
    removeItemFromCart(productToBeMoved._id);
    addItemToWishlist(productToBeMoved);
    setShowAlert(true);
    callAlert('Product removed to wishlist');
  };
  return (
    <WishListContext.Provider
      value={{
        itemsInWishList,
        isItemInWishlist,
        addItemToWishlist,
        AddToWishlistHander,
        removeItemFromWishlist,
        getWishlistItems,
        MoveToCartFromWishList,
        MoveToWishListFromCart,
        loading,
        showAlert,
        setShowAlert,
        callAlert,
      }}
    >
      {children}
    </WishListContext.Provider>
  );
};
