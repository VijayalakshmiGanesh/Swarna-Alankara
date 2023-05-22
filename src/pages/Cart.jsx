import { useContext, useEffect } from 'react';
import { CartContext } from '../contexts/CartContext';
import { NavLink } from 'react-router-dom';
import { WishListContext } from '../contexts/WishListContext';
import Loader from '../components/Loader/Loader';

function Cart() {
  const {
    itemsInCart,
    getCartItems,
    addItemToCart,
    removeItemFromCart,
    reduceItemQuantity,
    loading,
  } = useContext(CartContext);
  const { MoveToWishListFromCart } = useContext(WishListContext);

  useEffect(() => {
    getCartItems();
  }, []);
  return (
    <div>
      {/* <div className="relative h-[250px] bg-neutral-300">
                <img src="https://images.pexels.com/photos/9953655/pexels-photo-9953655.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" alt="Image" class="w-full object-cover h-full blur-sm" />
                <div className="absolute inset-0 flex items-center justify-center">
                    <h1 className="text-4xl font-bold text-[#efa939]">Shopping cart</h1>
                </div>
            </div> */}
      {loading && <Loader />}
      {itemsInCart?.length === 0 ? (
        <div className="flex justify-center items-center py-2 my-2 md:my-5 md:py-5 flex-col md:flex-row">
          <img src="../assests/emptyCart.svg" height="500" width="500" />
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
        <div className="container mx-auto xl:py-7  xl:my-7 flex ">
          <div className="order-items flex flex-col text-left w-[3/5]">
            <div className="flex justify-around text-blue-950 font-bold text-lg border-b-2">
              <span className="grow">Product</span>
              <span className="w-1/5 text-blue-950 ">Price</span>
              <span className="w-1/5">Quantity</span>
              <span className="w-1/5 text-blue-950"> Total</span>
              <span>&nbsp; &nbsp; &nbsp;</span>
            </div>
            {itemsInCart?.length === 0 ? (
              <p>No items in cart</p>
            ) : (
              <>
                {itemsInCart.map(item => {
                  const {
                    title,
                    qty,
                    subCategory,
                    price,
                    weight,
                    id,
                    _id,
                    imageURL,
                  } = item;

                  return (
                    <div
                      className="flex justify-around border-b-2 items-center"
                      key={id}
                    >
                      <div className="grow">
                        <NavLink
                          to={`/product-detail/${_id}`}
                          className=" flex items-center"
                        >
                          <img
                            src={imageURL}
                            alt={`${title} thumbnail`}
                            className="h-[100px] w-[100px]"
                          />
                          <div className="flex flex-col px-2">
                            <p>{title}</p>
                            <p>{subCategory}</p>
                            <p>{weight}</p>
                          </div>
                        </NavLink>
                      </div>
                      <span className="w-1/5">{price}</span>
                      <span className="w-1/5">
                        <button
                          className="px-1 bg-blue-900 text-white py-1 px-2 rounded-lg mx-2 min-w-[25px] font-bold"
                          onClick={() => addItemToCart(item)}
                        >
                          +
                        </button>
                        <span>{qty}</span>
                        <button
                          className="px-1 bg-blue-900 text-white py-1 px-2 rounded-lg mx-2 min-w-[25px] font-bold"
                          onClick={() => reduceItemQuantity(item._id, qty)}
                        >
                          -
                        </button>
                      </span>
                      <span className="w-1/5">Rs. {qty * price}</span>
                      <span className="w-1/5 flex flex-col">
                        <button
                          className="rounded-full bg-red-700 text-white hover:bg-white hover:text-red-700 m-3 px-2 py-1"
                          onClick={() => removeItemFromCart(item._id)}
                        >
                          Delete
                        </button>
                        <button
                          className="rounded-full bg-red-700 text-white hover:bg-white hover:text-red-700 px-2 py-1"
                          onClick={() => MoveToWishListFromCart(item)}
                        >
                          Move to wishlist
                        </button>
                      </span>
                    </div>
                  );
                })}
              </>
            )}
          </div>
          {/* <div className="cart-total w-[2/5]">
                    <h2>Cart total</h2>
                    <div className="  bg-neutral-100">
                        <div className="flex border-b-2">
                            <p>Have a coupon? </p>
                            <button>Apply</button>
                        </div>

                            <p className="border-b-2">Price details</p>
                        <div className="border-b-2">
                            <p>
                            <span>Price: [items]</span>
                            <span>₹ 1200</span>
                        </p>
                        <p>
                            <span>Discount:</span>
                            <span>₹ 1200</span>
                        </p>
                        <p>
                            <span>Delivery Charges</span>
                            <span>₹ 1200</span>
                        </p>
                        </div>
                        <p>Total Amount: ....</p>
                    </div>
                    <button>CHECK OUT</button>
                </div> */}
        </div>
      )}
    </div>
  );

  // return (
  //     <><h1>Cart</h1>
  //         {
  //             cartList?.length === 0 ? (<p>No items in the cart</p>) : (
  //                 <>
  //                     {
  //                         cartList?.map((product) => {
  //                              const {_id, title, qty, price, id} = product
  //                         return(
  //                             <div key={_id} className="bg-cyan-500 shadow-lg shadow-cyan-500/50 m-3">
  //                                 <p>{title}</p>
  //                                 <p>{qty}</p>
  //                                 <p>{price}</p>
  //                                 <button className="bg-blue-700 p-3 rounded text-white" onClick={() => deleteAnCartItem(_id)}>Delete</button>
  //                             </div>
  //                         )
  //                     })
  //                    }
  //                 </>
  //             )
  //     }
  //     </>
  // )
}

export default Cart;
