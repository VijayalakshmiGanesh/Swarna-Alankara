export const dataReducer = (result, action) => {
  console.log('action value in reducer', action);
  switch (action.type) {
    case 'CategoryList':
      console.log('action value in categoryList', {
        ...result,
        categoryList: action.payload,
      });
      return { ...result, categoryList: action.payload };

    case 'ProductList':
      return { ...result, productList: action.payload };

    case 'CartList':
      return { ...result, cartList: action.payload };

    case 'WishList':
      return { ...result, wishList: action.payload };

    case 'AddressList':
      return { ...result, addressList: action.payload };

    case 'UserDetails':
      return { ...result, userDetail: action.payload };

    case 'setLoading':
      return { ...result, isLoading: action.payload };

    default:
      return result;
  }
};

export const dataInitialState = {
  categoryList: [],
  productList: [],
  cartList: [],
  wishList: [],
  addressList: [],
  userDetail: {},
  isLoading: false,
};
