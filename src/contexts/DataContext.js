import { createContext, useContext, useReducer } from 'react';
import { dataInitialState, dataReducer } from '../redux/Data';
import {
  filterProductReducer,
  filtersInitialState,
} from '../redux/filterProducts';

export const DataContext = createContext();

export function DataProvider({ children }) {
  const [state, dispatch] = useReducer(dataReducer, dataInitialState);
  const [filterProductState, filterProductDispatch] = useReducer(
    filterProductReducer,
    filtersInitialState
  );
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
        loading: state?.isLoading,
        filterdispatch: filterProductDispatch,
        filterProductState,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export const useDataContext = () => useContext(DataContext);
