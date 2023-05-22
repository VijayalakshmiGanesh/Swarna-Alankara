import { useContext } from 'react';
import { WishListContext } from '../contexts/WishListContext';
import { NavLink } from 'react-router-dom';
import { CartContext } from '../contexts/CartContext';

function Wishlist() {
  const { itemsInWishList, removeItemFromWishlist, MoveToCartFromWishList } =
    useContext(WishListContext);

  return (
    <>
      {/* <h1>Wishlist</h1> */}
      {itemsInWishList.length === 0 ? (
        <div className="flex justify-center items-center py-2 my-2 md:my-5 md:py-5 flex-col md:flex-row min-h-[100vh]">
          <img
            src="../assests/emptyWishList.svg"
            alt="empty wishlist"
            height="500"
            width="500"
          />
          <div className="flex flex-col mx-2">
            <p className="text-2xl font-bold my-5">No items in wishlist</p>
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
        <div className="flex justify-center min-h-[70vh]">
          <div className="w-2/3 md:w-2/4 m-5 flex items-center flex-col  ">
            {itemsInWishList.map(item => {
              const { _id, title, categoryName, subCategory, price, imageURL } =
                item;
              return (
                <div
                  className="w-[420px] border-2 border-zinc-100 shadow-lg rounded-lg flex p-3 h-[220px] my-4 shadow-gray-500"
                  key={_id}
                >
                  <img
                    src={imageURL}
                    alt="product thumbnail"
                    className="object-cover"
                    height="100"
                    width="150"
                  />
                  <div className="text-left px-3">
                    <h2 className="text-blue-900 font-bold text-lg product-title">
                      {title}
                    </h2>
                    <p className="text-xs text-neutral-700">
                      <span className="">{categoryName}</span> -
                      <span className=""> {subCategory} </span>
                    </p>
                    <p className="text-pink-700 font-bold">Rs. {price}/-</p>
                    <button
                      className="bg-pink-700 text-white text-semibold p-3 rounded-lg my-3 "
                      onClick={() => MoveToCartFromWishList(item)}
                    >
                      Move to cart
                    </button>
                    <button
                      className="text-pink-700 bg-white text-semibold px-3 py-2 rounded-lg border-pink-700 border-2 mx-2"
                      onClick={() => removeItemFromWishlist(_id)}
                    >
                      X
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}

export default Wishlist;
