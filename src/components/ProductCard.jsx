import { NavLink, useNavigate } from 'react-router-dom';

import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { useContext } from 'react';
import { CartContext } from '../contexts/CartContext';
import { WishListContext } from '../contexts/WishListContext';
import { AuthContext } from '../contexts/AuthContext';

function ProductCard({ product }) {
  const { isUserLoggedIn } = useContext(AuthContext);
  const { addItemToCart, isItemInCart } = useContext(CartContext);
  const navigate = useNavigate();

  const { isItemInWishlist, addItemToWishlist, removeItemFromWishlist } =
    useContext(WishListContext);

  function AddToCartHander(producttoAddinCart) {
    if (isUserLoggedIn) {
      addItemToCart(producttoAddinCart);
    } else {
      navigate('/login');
    }
  }

  function AddToWishlistHander(producttoAddorRemove, operation) {
    if (isUserLoggedIn) {
      operation === 'add'
        ? addItemToWishlist(producttoAddorRemove)
        : removeItemFromWishlist(producttoAddorRemove._id);
    } else {
      navigate('/login');
    }
  }
  const { _id, title, imageURL, price, rating } = product;
  return (
    <div
      className="flex flex-col px-2 py-2 m-3 h-[31rem] w-[15rem] border-2 border-zinc-300 shadow-lg rounded-lg bg-gray-100"
      key={_id}
    >
      <NavLink to={`/product-detail/${_id}`} className="flex flex-col">
        <img
          src={imageURL}
          className="object-cover h-3/4 py-3"
          alt={`${title} thumbnail`}
          style={{ height: 320 }}
        />
        <div className="grow my-1">
          <p className="text-blue-900 font-semibold text-lg">{title}</p>
          <p className="my-1">
            <span className="text-pink-700 font-bold">Rs. {price}/-</span>
            <span className="bg-blue-900 text-white text-sm px-2  rounded-lg mx-2 py-[1px]">
              {rating}★
            </span>
          </p>
        </div>
      </NavLink>

      <p className="flex justify-center items-center w-full py-2">
        <button
          className="text-white bg-pink-700  p-3 rounded-md w-3/5 font-bold"
          onClick={() =>
            isItemInCart(_id) === -1
              ? AddToCartHander(product)
              : navigate('/cart')
          }
        >
          {isItemInCart(_id) === -1 ? 'Add To Cart' : 'Go To Cart'}
        </button>
        <button
          className=""
          onClick={() =>
            AddToWishlistHander(
              product,
              isItemInWishlist(_id) === -1 ? 'add' : 'remove'
            )
          }
        >
          {isItemInWishlist(_id) === -1 ? (
            <AiOutlineHeart
              style={{
                border: '2px solid rgb(190 24 93)',
                padding: '5',
                fontWeight: 700,
                borderRadius: 5,
                fontSize: 'xx-large',
                marginLeft: 10,
                color: ' rgb(190 24 93)',
                height: '2.9rem',
              }}
            />
          ) : (
            <AiFillHeart
              style={{
                border: '2px solid rgb(190 24 93)',
                // backgroundColor: ' rgb(190 24 93)',
                padding: '5',
                fontWeight: 700,
                borderRadius: 5,
                fontSize: 'xx-large',
                marginLeft: 10,
                // color: ' white',
                color: 'red',
                height: '2.9rem',
              }}
            />
          )}
        </button>
      </p>
    </div>
  );
}

export default ProductCard;
