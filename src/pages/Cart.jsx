import { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Loader from '../components/Loader/Loader';
import { useDataContext } from '../contexts/DataContext';
import {
  MoveToWishListFromCart,
  addItemToCart,
  reduceItemQuantity,
  removeItemFromCart,
} from '../services/cart';

function Cart() {
  const {
    datadispatch,
    cartItems,
    loading,
    wishlistItems,
    setLoading,
    discountAmount,
  } = useDataContext();
  const [itemsInCart, setItemsInCart] = useState(cartItems);

  const [enteredDiscountCode, setDiscountCode] = useState('');
  const navigate = useNavigate();
  const totalAmount =
    itemsInCart?.length > 0 &&
    itemsInCart?.reduce((sum, item) => sum + item.qty * item.price, 0);
  const [discountPercent, setDiscountPercent] = useState(0);

  const discountHandler = () => {
    if (enteredDiscountCode.toUpperCase() === 'NEO5') {
      setDiscountPercent(0.05);
    } else {
      setDiscountPercent(0);
    }
    datadispatch({
      type: 'setDiscount',
      payload: Math.round(totalAmount * discountPercent),
    });
  };

  useEffect(() => {
    setLoading(() => true);
    setItemsInCart(cartItems);
    setTimeout(() => {
      setLoading(() => false);
    }, 500);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartItems]);
  return (
    <div>
      {loading ? (
        <Loader />
      ) : itemsInCart?.length === 0 ? (
        <div className="flex justify-center items-center py-2 my-2 md:my-5 md:py-5 flex-col md:flex-row min-h-[70vh]">
          <img
            src="../assests/emptyCart.svg"
            height="500"
            width="500"
            alt="Empty cart"
          />
          <div className="flex flex-col">
            <p className="text-2xl font-bold my-5">No items in cart</p>
            <p>
              <NavLink
                to="/products"
                className="bg-pink-700 rounded-lg my-3 px-2 py-3"
              >
                Go to Products &gt;
              </NavLink>
            </p>
          </div>
        </div>
      ) : (
        <>
          <div className="flex p-2 justify-center my-5 flex-col md:flex-row ">
            <table class="table-fixed border-spacing-x-2 border-spacing-y-3 border-separate border-2 border-gray-200 border-solid">
              <thead>
                <tr className="py-1 border-b-2 border-solid border-zinc-700">
                  <th>Item</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                  <th className="text-white">Operations</th>
                </tr>
              </thead>
              <tbody>
                <>
                  {itemsInCart.map(item => {
                    const {
                      title,
                      qty,
                      subCategory,
                      price,
                      weight,
                      _id,
                      imageURL,
                    } = item;

                    return (
                      <tr
                        className="border-2 border-solid  border-gray-500 border border-slate-600"
                        key={_id}
                      >
                        <td className="w-2/5">
                          <NavLink
                            to={`/product-detail/${_id}`}
                            className=" flex items-center"
                          >
                            <img
                              src={imageURL}
                              alt={`${title} thumbnail`}
                              className="h-[100px] w-[100px] object-cover min-w-[100px]"
                            />
                            <div className="flex flex-col px-2 text-left">
                              <p className="text-blue-950 font-semibold">
                                {title}
                              </p>
                              <p className="text-xs ">{subCategory}</p>
                              <p className="text-xs ">{weight} grams</p>
                            </div>
                          </NavLink>
                        </td>
                        <td className="text-pink-700 font-semibold">
                          Rs.{price}/-
                        </td>
                        <td>
                          <span className="">
                            <button
                              className="px-1 bg-blue-900 text-white py-1 px-2 rounded-xl mx-2 min-w-[25px] font-bold"
                              onClick={() =>
                                addItemToCart(item, datadispatch, itemsInCart)
                              }
                            >
                              +
                            </button>
                            <span>{qty}</span>
                            <button
                              className="px-1 bg-blue-900 text-white py-1 px-2 rounded-xl mx-2 min-w-[25px] font-bold"
                              onClick={() =>
                                reduceItemQuantity(item._id, qty, datadispatch)
                              }
                            >
                              -
                            </button>
                          </span>
                        </td>
                        <td className="text-pink-700 font-semibold">
                          Rs.{qty * price}/-
                        </td>
                        <td>
                          <span className="flex flex-col">
                            <button
                              className="rounded-full w-[90%] bg-pink-700 text-white hover:bg-white hover:text-pink-700 hover:border-pink-700 hover:border-solid hover:border-2 hover:font-semibold  my-1 px-2 py-1"
                              onClick={() =>
                                removeItemFromCart(item._id, datadispatch)
                              }
                            >
                              Delete
                            </button>
                            <button
                              className="rounded-full w-[90%] bg-pink-700 text-white hover:bg-white hover:text-pink-700 hover:border-pink-700 hover:border-solid hover:border-2 hover:font-semibold my-1 px-2 py-1"
                              onClick={() =>
                                MoveToWishListFromCart(
                                  item,
                                  datadispatch,
                                  wishlistItems
                                )
                              }
                            >
                              Move to wishlist
                            </button>
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </>
              </tbody>
            </table>
            <div className="mx-4">
              <div className=" rounded-lg shadow-lg my-1 mx-2 w-[23rem] p-5">
                <p className="border-y-4 border-solid border-blue-950 p-3 font-bold text-blue-950 my-3">
                  PRICE DETAILS
                </p>
                <div className="my-2 py-2">
                  <p className="flex justify-between">
                    <span>Price [{itemsInCart.length} items]</span>
                    <span>₹ {totalAmount}.00</span>
                  </p>
                  <p className="flex justify-between">
                    <span>Discount</span>
                    <span>₹ 0</span>
                  </p>
                  <p className="flex justify-between">
                    <span>Delivery charges</span>
                    <span>FREE</span>
                  </p>
                  <p className="flex justify-between">
                    <span>Coupon discount</span>
                    <span>₹ {discountAmount}.00</span>
                  </p>
                </div>
                <p className="flex justify-between py-3">
                  <input
                    type="text"
                    placeholder="Enter code"
                    className="border-2 border-solid border-slate-200 p-2 rounded-lg"
                    onChange={e => setDiscountCode(e.target.value)}
                    disabled={discountPercent > 1 ? true : false}
                  />
                  <button
                    className="rounded-lg bg-pink-700 text-white hover:bg-white hover:text-pink-700 hover:border-pink-700 hover:border-solid hover:border-2 hover:font-semibold my-1 px-2 py-2"
                    onClick={() =>
                      enteredDiscountCode.length !== 0 &&
                      enteredDiscountCode.trim() !== '' &&
                      discountHandler()
                    }
                    disabled={discountPercent > 1 ? true : false}
                  >
                    Apply Coupon
                  </button>
                </p>
                <p className="border-y-4 border-solid border-blue-950 p-3 font-bold flex justify-between text-blue-950 mb-3">
                  <span>TOTAL AMOUNT</span>
                  <span>
                    ₹ {Math.round(totalAmount - discountAmount)}
                    .00
                  </span>
                </p>
                <p className="text-pink-700 font-semibold py-3">
                  {`You will save ₹ ${discountAmount}.00 on this order`}
                </p>
                <button
                  className="rounded-full w-[90%] bg-pink-700 text-white hover:bg-white hover:text-pink-700 hover:border-pink-700 hover:border-solid hover:border-2 hover:font-semibold my-1 px-2 py-1"
                  onClick={() => {
                    datadispatch({
                      type: 'setTotalPrice',
                      payload: totalAmount,
                    });
                    navigate('/checkout');
                  }}
                >
                  CHECKOUT
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
