import { useEffect, useState } from 'react';
import { useDataContext } from '../contexts/DataContext';
import { NavLink, useNavigate } from 'react-router-dom';
import { v4 as uuid } from 'uuid';

import OrderPlaced from '../components/OrderPlaced';
import { notifyError, notifySuccess } from '../components/Toasters';

function Checkout() {
  const { addressBook, datadispatch, addressToDeliver } = useDataContext();
  const { cartItems, discountAmount, totalPrice } = useDataContext();
  const [addressSelected, setAddressSelected] = useState(addressBook[0]);
  const [hasPlacedOrder, setHasPlacedOrder] = useState(false);
  const navigate = useNavigate();

  const addressHandler = idTosearch =>
    setAddressSelected(() => addressBook.find(({ _id }) => _id === idTosearch));

  useEffect(() => {
    datadispatch({ type: 'setAddressToDeliver', payload: addressSelected });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addressSelected]);

  const displayRazorpay = async () => {
    try {
      const options = {
        key: 'rzp_test_F617Mbu1qtcOjP',
        key_secret: 'QT7L9An23MIuWHmA8Afo30Dq',
        amount: Number(totalPrice - discountAmount) * 100,
        currency: 'INR',
        name: 'Swarna Alankara',
        description: 'Thank you for shopping with us',
        image: './assests/logo1-removebg-preview.png',
        handler: function (response) {
          notifySuccess('Payment successful');
          setHasPlacedOrder(true);
          datadispatch({
            type: 'setOrderHistory',
            payload: {
              orderId: uuid(),
              cartItems,
              addressToDeliver: addressSelected,
              discountAmount,
              totalPrice,
            },
          });
          setTimeout(() => {
            navigate('/orderSummary');
          }, 2500);
        },
        prefill: {
          name: `Vijayalakshmi`,
          email: 'gviji152000@gmail.com',
          contact: '900000000',
        },
        theme: {
          color: '#be185d',
        },
      };
      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (e) {
      console.log(e);
    }
  };

  const checkoutHandler = () => {
    displayRazorpay();
  };
  return (
    <>
      {hasPlacedOrder ? (
        <OrderPlaced />
      ) : (
        <>
          <h1 className="text-2xl text-blue-950 font-bold">Checkout</h1>
          <div className="flex flex-col md:flex-row justify-around items-center md:items-start">
            <div className="md:w-1/2 ">
              <div className="flex-col justify-center ">
                {addressBook?.length === 0 ? (
                  <p
                    className="text-blue-950
                    my-3
                    font-semibold
                    border
                    border-2
                    py-1
                    bg-red-100
                    mx-1"
                  >
                    No address available. Go to &nbsp;
                    <span>
                      <NavLink
                        to="/user-profile"
                        className="text-pink-700 font-bold  hover:underline hover:decoration-4"
                      >
                        profile page
                      </NavLink>
                    </span>{' '}
                    to add address
                  </p>
                ) : (
                  <>
                    {addressBook?.map((i, idx) => {
                      const {
                        _id,
                        name,
                        street,
                        city,
                        state,
                        country,
                        zipCode,
                        mobile,
                      } = i;
                      return (
                        <div
                          key={_id}
                          className="mt-3 border border-2 border-solid border-gray-50 shadow-lg flex justify-left text-left mx-1"
                        >
                          <input
                            type="radio"
                            name="address"
                            value={_id}
                            className="mx-3"
                            defaultChecked={idx === 0 ? true : false}
                            onChange={e => {
                              e.target.checked &&
                                addressHandler(e.target.value);
                            }}
                          />
                          <span>
                            <p className="font-semibold">{name}</p>
                            <p className="text-slate-700 text-sm ">
                              {`${street}, ${city}, ${state}, ${country} `}
                            </p>
                            <p className="text-slate-700 text-sm ">{zipCode}</p>
                            <p className="text-slate-700 text-sm ">{`Phone Number: ${mobile}`}</p>
                          </span>
                        </div>
                      );
                    })}
                    <p className="text-blue-950 my-3 font-semibold border border-2 py-1 bg-red-100 mx-1">
                      To add new address, go to &nbsp;
                      <span>
                        <NavLink
                          to="/user-profile"
                          className="text-pink-700 font-bold  hover:underline hover:decoration-4"
                        >
                          profile page
                        </NavLink>
                      </span>
                      .
                    </p>
                  </>
                )}
              </div>
            </div>
            <div className="">
              <div className=" rounded-lg shadow-lg my-1 mx-2 w-[22rem] md:w-[30rem] p-5">
                <p className="border-y-4 border-solid border-blue-950 p-3 font-bold text-blue-950 my-3">
                  ORDER DETAILS
                </p>
                <div className="my-1 py-1">
                  <p className="flex justify-between">
                    <span className="font-semibold">Item</span>
                    <span className="font-semibold">Qty</span>
                  </p>
                  <p className="flex-col">
                    {cartItems?.map(({ title, qty }) => {
                      return (
                        <p className="flex justify-between text-left">
                          <span>{title}</span>
                          <span>{qty}</span>
                        </p>
                      );
                    })}
                  </p>
                </div>
                <p className="border-y-4 border-solid border-blue-950 p-3 font-bold text-blue-950 my-3">
                  PRICE DETAILS
                </p>
                <div className="my-1 py-1">
                  <p className="flex justify-between">
                    <span>Price [{cartItems.length} items]</span>
                    <span>₹ {totalPrice}.00</span>
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
                  <p className="flex justify-between text-blue-950 my-1 font-bold">
                    <span>TOTAL AMOUNT</span>
                    <span>
                      {totalPrice - discountAmount}
                      .00
                    </span>
                  </p>
                </div>
                <p className="border-y-4 border-solid border-blue-950 p-3 font-bold text-blue-950 my-3">
                  Deliver To
                </p>

                <div className="mb-1 pb-1">
                  {addressBook.length !== 0 ? (
                    <>
                      <p className="text-slate-700 text-sm text-left ">{`${addressToDeliver?.name} ${addressToDeliver?.street}, ${addressToDeliver?.city}, ${addressToDeliver?.state}, ${addressToDeliver?.country} - ${addressToDeliver?.zipCode}`}</p>

                      <p className="text-slate-700 text-sm text-left">{`Phone Number: ${addressToDeliver?.mobile}`}</p>
                    </>
                  ) : (
                    <p className="text-red-700 font-bold ">
                      Select a address to proceed
                    </p>
                  )}
                </div>
                <button
                  onClick={() =>
                    addressBook.length === 0
                      ? notifyError('Add address to checkout')
                      : checkoutHandler()
                  }
                  className="rounded-full w-[90%] bg-pink-700 text-white hover:bg-white hover:text-pink-700 hover:border-pink-700 hover:border-solid hover:border-2 hover:font-semibold my-1 px-2 py-1"
                >
                  PLACE ORDER
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Checkout;
