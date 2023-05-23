import { createContext, useContext, useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { useNavigate } from 'react-router';
import { WishListContext } from './WishListContext';

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [itemsInCart, setItemsInCart] = useState([]);
  const { isUserLoggedIn } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const { setShowAlert, callAlert } = useContext(WishListContext);
  const navigate = useNavigate();

  const getCartItems = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/user/cart', {
        method: 'GET',
        headers: {
          authorization: localStorage.getItem('key'),
        },
      });

      if (response.status === 200) {
        setItemsInCart(JSON.parse(response._bodyInit).cart);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  const isItemInCart = idToFind =>
    itemsInCart.findIndex(({ _id }) => _id === idToFind);

  const addItemToCart = async productToAddInCart => {
    const isItemFound = isItemInCart(productToAddInCart._id);
    setLoading(true);
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
          setShowAlert(true);
          callAlert('Product added to cart');
        }
      } catch (e) {
        console.log(e);
      }
    } else {
      try {
        const response = await fetch(
          `/api/user/cart/${productToAddInCart._id}`,
          {
            method: 'POST',
            headers: {
              authorization: localStorage.getItem('key'),
            },
            body: JSON.stringify({
              action: {
                type: 'increment',
              },
            }),
          }
        );

        if (response.status === 201) {
          setShowAlert(true);
          callAlert('Success');
        }
      } catch (e) {
        console.log(e);
      }
    }
    setLoading(false);
    getCartItems();
  };

  const removeItemFromCart = async productToBeRemovedFromCartID => {
    setLoading(true);
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
      if (response.status === 201) {
        setShowAlert(true);
        callAlert('Product removed from cart');
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
    getCartItems();
  };

  const reduceItemQuantity = async (itemToReduceQuantityID, qty) => {
    setLoading(true);
    if (qty > 1) {
      try {
        const response = await fetch(
          `/api/user/cart/${itemToReduceQuantityID}`,
          {
            method: 'POST',
            headers: {
              authorization: localStorage.getItem('key'),
            },
            body: JSON.stringify({
              action: {
                type: 'decrement',
              },
            }),
          }
        );
        if (response.status === 201) {
          setShowAlert(true);
          callAlert('Success');
        }
      } catch (e) {
        console.log(e);
      }
    } else {
      removeItemFromCart(itemToReduceQuantityID);
    }
    setLoading(false);
    getCartItems();
  };

  function AddToCartHander(producttoAddinCart) {
    if (isUserLoggedIn) {
      addItemToCart(producttoAddinCart);
    } else {
      navigate('/login');
    }
  }

  useEffect(() => getCartItems, []);
  return (
    <CartContext.Provider
      value={{
        itemsInCart,
        isItemInCart,
        getCartItems,
        addItemToCart,
        removeItemFromCart,
        reduceItemQuantity,
        AddToCartHander,
        loading,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

// export function CartProvider({ children }) {

//     const [messageFromAPI, setMessageFromAPI] = useState("")

//     const CartOperations = (result, action) => {
//         console.log(action)
//         switch (action.type) {
//             case "AddItemToCart":
//                 console.log("add item to cart ", {...result, cart: [...result.cart, action.payload]})
//                 return  {...result, cart: [...result.cart, action.payload]};

//             case "IncrementIteminCart":
//                 console.log("increment",result.cart.filter((product) => product._id === action.payload ?{ ...product, qty: product.qty + 1 } :product))
//                 return {...result, cart: result.cart.filter((product) => product._id === action.payload ? { ...product, qty: product.qty + 1 } : product)};
//             case "DecrementItemInCart":
//                 return result.cart.filter((product) => product._id === action.payload ? { ...product, qty: product.qty - 1 } : product);
//             case "RemoveItemFromCart":
//                 return result.cart.filter(({ _id }) => _id !== action.payload)
//             default:
//                 return result;
//         }
//     }
//     const [state, dispatch] = useReducer(CartOperations, {
//         wishlist: [],
//         cart: []
//     })
//     const findItem = (arr, itemToFind) => state[arr].findIndex(({_id}) => _id === itemToFind)
//     console.log("state", state)

//     const AddToCart = async (productToAddInCart) => {
//         const IsItemFound = findItem("cart", productToAddInCart._id)
//         console.log("IsItemFound", IsItemFound)
//         if (IsItemFound === -1) {
//             try {
//             const response = await fetch("/api/user/cart", {
//       method: "POST",
//       headers: {
//         "authorization": localStorage.getItem("key"),
//       },
//       body: JSON.stringify({product: productToAddInCart}),
//     });

//             setMessageFromAPI(response)
//             dispatch({type: "AddItemToCart", payload: {...productToAddInCart, qty: 1}})
//         } catch (e) {
//             console.log(e)
//         }
//         } else {
//              try {
//             const response = await fetch(`/api/user/cart/${productToAddInCart._id}`, {
//       method: "POST",
//       headers: {
//         "authorization": localStorage.getItem("key"),
//       },
//                 body: JSON.stringify({
//                     action: {
//                         type: "increment"
//                     }
//                 }),
//     });

//             setMessageFromAPI(response)
//             dispatch({type: "IncrementIteminCart", payload: productToAddInCart._id})
//         } catch (e) {
//             console.log(e)
//         }

//         }
//     }
