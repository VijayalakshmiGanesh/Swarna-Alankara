import { useEffect } from 'react';
import { useDataContext } from '../contexts/DataContext';
import { removeItemFromCart } from '../services/cart';
function OrderSummary() {
  const { orderHistory, datadispatch } = useDataContext();
  console.log('orderHistory', orderHistory);

  const { orderId, cartItems, totalPrice, addressToDeliver, discountAmount } =
    orderHistory[orderHistory.length - 1];

  const clearItemsHandler = () => {
    cartItems?.map(({ _id }) => removeItemFromCart(_id, datadispatch, true));
  };
  useEffect(() => {
    clearItemsHandler();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <div className="container mx-auto xl:py-7  xl:my-7 flex justify-center">
        <div className=" w-[750px] md:min-h-[400px] border-2 border-solid shadow-2xl flex p-5 flex-col md:flex-row min-h-fit m-3 md:m-none rounded-lg ">
          <div className="px-5 py-3 text-blue-900 text-left">
            <h2 className="font-bold text-2xl text-left text-pink-700">
              Order Confirmed
            </h2>
            <div className="my-2 ">
              <p className="py-2 font-bold ">
                <span className="">Order Id: </span>
                <span>{orderId}</span>
              </p>
              <p className="py-2 font-bold ">
                <span>Total Amount:</span>
                <span>{totalPrice - discountAmount}</span>
              </p>
              <p className="pt-2 font-bold ">Order will be delivered to: </p>
              <div>
                <p className="">{addressToDeliver.name}</p>
                <p>
                  {addressToDeliver?.street}, {addressToDeliver?.city},{' '}
                  {addressToDeliver?.country}, {addressToDeliver?.zipCode}
                </p>
                <p>Phone Number: {addressToDeliver?.mobile}</p>
              </div>
            </div>
          </div>
          <div>
            {cartItems?.map(item => {
              const {
                _id,
                title,
                categoryName,
                subCategory,
                price,
                imageURL,
                qty,
              } = item;
              return (
                <div
                  className="w-[380px] border-2 border-solid shadow-lg rounded-lg flex p-3 h-[150px] my-4"
                  key={_id}
                >
                  <img
                    src={imageURL}
                    alt="product thumbnail"
                    className="object-cover"
                    height="50"
                    width="150"
                  />
                  <div className="text-left px-3">
                    <h2 className="text-blue-900 font-bold product-title">
                      {title}
                    </h2>
                    <p className="text-xs text-neutral-700">
                      <span className="">{categoryName}</span> -
                      <span className=""> {subCategory} </span>
                    </p>
                    <p className="text-blue-900 font-bold py-1">
                      Quantity: {qty}
                    </p>
                    <p className="text-pink-700 font-bold">Rs. {price}/-</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default OrderSummary;
