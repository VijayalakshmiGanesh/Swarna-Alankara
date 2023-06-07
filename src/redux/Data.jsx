export const dataReducer = (result, action) => {
  // console.log('action value in reducer', action);
  switch (action.type) {
    case 'CategoryList':
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

    case 'setDiscount':
      return { ...result, discountAmount: action.payload };

    case 'setTotalPrice':
      return { ...result, totalPrice: action.payload };

    case 'setAddressToDeliver':
      return { ...result, addressToDeliver: action.payload };

    case 'setOrderHistory':
      return {
        ...result,
        orderHistory: [...result.orderHistory, action.payload],
      };

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
  isLoading: true,
  discountAmount: 0,
  totalPrice: 0,
  addressToDeliver: {},
  orderHistory: [],
};
