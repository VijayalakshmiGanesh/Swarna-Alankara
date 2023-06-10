import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from 'react';
import { dataInitialState, dataReducer } from '../redux/Data';
import {
  filterProductReducer,
  filtersInitialState,
} from '../redux/filterProducts';
import { getProductsFromAPI } from '../services/products';
import { getCartItems } from '../services/cart';
import { getWishlistItems } from '../services/wishlist';
import { getCategoriesFromAPI } from '../services/category';

export const DataContext = createContext();

export function DataProvider({ children }) {
  const [state, dispatch] = useReducer(dataReducer, dataInitialState);
  const [filterProductState, filterProductDispatch] = useReducer(
    filterProductReducer,
    filtersInitialState
  );
  const [loading, setLoading] = useState(false);
  const [textToSearch, SetTextToSearch] = useState('');
  useEffect(() => {
    setLoading(() => true);
    getProductsFromAPI(dispatch);
    getCartItems(dispatch);
    getWishlistItems(dispatch);
    getCategoriesFromAPI(dispatch);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <DataContext.Provider
      value={{
        category: state?.categoryList,
        products: state?.productList,
        cartItems: state?.cartList,
        wishlistItems: state?.wishList,
        addressBook: state?.addressList,
        userDetails: state?.userDetail,
        datadispatch: dispatch,
        // loading: state?.isLoading,
        loading,
        setLoading,
        filterdispatch: filterProductDispatch,
        filterProductState,
        discountAmount: state?.discountAmount,
        totalPrice: state?.totalPrice,
        addressToDeliver: state?.addressToDeliver,
        orderHistory: state?.orderHistory,
        textToSearch,
        SetTextToSearch,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export const useDataContext = () => useContext(DataContext);
