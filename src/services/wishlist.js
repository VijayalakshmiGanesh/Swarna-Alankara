import { notifyError, notifySuccess } from '../components/Toasters';
import { addItemToCart } from './cart';

export const getWishlistItems = async dataDispatch => {
  dataDispatch({ type: 'setLoading', payload: 'true' });
  try {
    const response = await fetch('/api/user/wishlist', {
      method: 'GET',
      headers: {
        authorization: localStorage.getItem('key'),
      },
    });

    if (response.status === 200) {
      dataDispatch({
        type: 'WishList',
        payload: JSON.parse(response._bodyInit).wishlist,
      });
      //   setItemsinWishList(JSON.parse(response._bodyInit).wishlist);
    }
  } catch (e) {
    console.log(e);
  } finally {
    dataDispatch({ type: 'setLoading', payload: 'false' });
  }
};

export const isItemInWishlist = (idToFind, itemsInWishList) =>
  itemsInWishList.findIndex(({ _id }) => _id === idToFind);

export const addItemToWishlist = async (
  productToAddWishlist,
  dataDispatch,
  itemsInWishList,
  flag
) => {
  // const isItemFound = isItemInWishlist(
  //   productToAddWishlist._id,
  //   itemsInWishList
  // );
  // if (isItemFound === -1) {
  dataDispatch({ type: 'setLoading', payload: 'true' });
  try {
    const response = await fetch('/api/user/wishlist', {
      method: 'POST',
      headers: {
        authorization: localStorage.getItem('key'),
      },
      body: JSON.stringify({ product: productToAddWishlist }),
    });
    if (response.status === 201) {
      flag !== true && notifySuccess('Product added to wishlist');
    } else {
      notifyError('Something went wrong. Please try again later');
    }
  } catch (e) {
    console.log(e);
  } finally {
    dataDispatch({ type: 'setLoading', payload: 'false' });
  }
  // }
  //   else {
  //     navigate('/wishlist');
  //   }
  getWishlistItems(dataDispatch);
};

export function AddToWishlistHander(
  producttoAddinWishlist,
  dataDispatch,
  itemsInWishList
) {
  // if (isUserLoggedIn) {
  addItemToWishlist(producttoAddinWishlist, dataDispatch, itemsInWishList);
  // } else {
  //   navigate('/login');
  // }
}

export const removeItemFromWishlist = async (
  productToBeRemovedFromWishlistID,
  dataDispatch,
  flag
) => {
  dataDispatch({ type: 'setLoading', payload: 'true' });
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
    if (response.status === 200) {
      flag !== true && notifySuccess('Product removed from wishlist');
    } else {
      notifyError('Something went wrong. Please try again later');
    }
  } catch (e) {
    console.log(e);
  } finally {
    dataDispatch({ type: 'setLoading', payload: 'false' });
  }
  getWishlistItems(dataDispatch);
};

export const MoveToCartFromWishList = (
  productToBeMoved,
  dataDispatch,
  itemsInCart
) => {
  removeItemFromWishlist(productToBeMoved._id, dataDispatch, true);
  addItemToCart(productToBeMoved, dataDispatch, itemsInCart, true);
  notifySuccess('Product moved to cart');
};
