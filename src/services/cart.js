import { notifyError, notifySuccess } from '../components/Toasters';
import { addItemToWishlist } from './wishlist';

export const getCartItems = async dataDispatch => {
  dataDispatch({ type: 'setLoading', payload: 'true' });
  try {
    const response = await fetch('/api/user/cart', {
      method: 'GET',
      headers: {
        authorization: localStorage.getItem('key'),
      },
    });

    if (response.status === 200) {
      dataDispatch({
        type: 'CartList',
        payload: JSON.parse(response._bodyInit).cart,
      });
      //   setItemsInCart(JSON.parse(response._bodyInit).cart);
    }
  } catch (e) {
    console.log(e);
  } finally {
    dataDispatch({ type: 'setLoading', payload: 'false' });
  }
};
export const isItemInCart = (idToFind, itemsInCart) =>
  itemsInCart.findIndex(({ _id }) => _id === idToFind);

export const addItemToCart = async (
  productToAddInCart,
  dataDispatch,
  itemsInCart,
  flag
) => {
  const isItemFound = isItemInCart(productToAddInCart._id, itemsInCart);
  dataDispatch({ type: 'setLoading', payload: 'true' });
  if (isItemFound === -1) {
    try {
      const response = await fetch('/api/user/cart', {
        method: 'POST',
        headers: {
          authorization: localStorage.getItem('key'),
        },
        body: JSON.stringify({ product: productToAddInCart }),
      });

      if (response.status === 201) {
        flag !== true && notifySuccess('Product added to cart');
      } else {
        notifyError('Some error occured. please try again');
      }
    } catch (e) {
      console.log(e);
    }
  } else {
    try {
      const response = await fetch(`/api/user/cart/${productToAddInCart._id}`, {
        method: 'POST',
        headers: {
          authorization: localStorage.getItem('key'),
        },
        body: JSON.stringify({
          action: {
            type: 'increment',
          },
        }),
      });

      if (response.status === 200) {
        notifySuccess('Quantity incremented');
      } else {
        notifyError('Some error occured. please try again');
      }
    } catch (e) {
      console.log(e);
    }
  }
  dataDispatch({ type: 'setLoading', payload: 'false' });
  getCartItems(dataDispatch);
};

export const removeItemFromCart = async (
  productToBeRemovedFromCartID,
  dataDispatch,
  flag
) => {
  dataDispatch({ type: 'setLoading', payload: 'true' });
  try {
    const response = await fetch(
      `/api/user/cart/${productToBeRemovedFromCartID}`,
      {
        method: 'DELETE',
        headers: {
          authorization: localStorage.getItem('key'),
        },
      }
    );
    if (response.status === 200) {
      flag !== true && notifySuccess('Product removed from cart');
    }
  } catch (e) {
    console.log(e);
  } finally {
    dataDispatch({ type: 'setLoading', payload: 'false' });
  }
  getCartItems(dataDispatch);
};

export const reduceItemQuantity = async (
  itemToReduceQuantityID,
  qty,
  dataDispatch
) => {
  dataDispatch({ type: 'setLoading', payload: 'true' });
  if (qty > 1) {
    try {
      const response = await fetch(`/api/user/cart/${itemToReduceQuantityID}`, {
        method: 'POST',
        headers: {
          authorization: localStorage.getItem('key'),
        },
        body: JSON.stringify({
          action: {
            type: 'decrement',
          },
        }),
      });
      if (response.status === 200) {
        notifySuccess('Quantity reduced');
      }
    } catch (e) {
      console.log(e);
    }
  } else {
    removeItemFromCart(itemToReduceQuantityID, dataDispatch);
  }
  dataDispatch({ type: 'setLoading', payload: 'false' });
  getCartItems(dataDispatch);
};

export const AddToCartHander = (
  producttoAddinCart,
  datadispatch,
  itemsInCart
) => {
  addItemToCart(producttoAddinCart, datadispatch, itemsInCart);
};

export const MoveToWishListFromCart = (
  productToBeMoved,
  dataDispatch,
  itemsInWishList
) => {
  removeItemFromCart(productToBeMoved._id, dataDispatch, true);
  addItemToWishlist(productToBeMoved, dataDispatch, itemsInWishList, true);
  notifySuccess('Product moved to wishlist');
};
