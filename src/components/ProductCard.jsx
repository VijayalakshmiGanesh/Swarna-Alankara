import { NavLink, useNavigate } from 'react-router-dom';

import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { useContext, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { addItemToCart, isItemInCart } from '../services/cart';
import { useDataContext } from '../contexts/DataContext';
import {
  addItemToWishlist,
  removeItemFromWishlist,
  isItemInWishlist,
} from '../services/wishlist';

function ProductCard({ product }) {
  const { isUserLoggedIn } = useContext(AuthContext);
  const { cartItems, datadispatch, wishlistItems } = useDataContext();
  const navigate = useNavigate();
  const [disabledButtons, setDisabledButtons] = useState([]);
  const [wishlistDisabledButtons, setWishListDisabledButtons] = useState([]);

  const handleButtonClick = buttonId => {
    // Check if the button is already disabled
    if (!disabledButtons.includes(buttonId)) {
      // Disable the button
      setDisabledButtons([...disabledButtons, buttonId]);

      // Enable the button after 1 second
      setTimeout(() => {
        setDisabledButtons(disabledButtons.filter(btnId => btnId !== buttonId));
      }, 1000);
    }
  };

  const handleWishlistButtonClick = buttonId => {
    // Check if the button is already disabled
    if (!wishlistDisabledButtons.includes(buttonId)) {
      // Disable the button
      setWishListDisabledButtons([...wishlistDisabledButtons, buttonId]);

      // Enable the button after 1 second
      setTimeout(() => {
        setWishListDisabledButtons(
          wishlistDisabledButtons.filter(btnId => btnId !== buttonId)
        );
      }, 1000);
    }
  };
  function AddToCartHander(producttoAddinCart) {
    if (isUserLoggedIn) {
      addItemToCart(producttoAddinCart, datadispatch, cartItems);
    } else {
      navigate('/login');
    }
  }

  function AddToWishlistHander(producttoAddorRemove, operation) {
    if (isUserLoggedIn) {
      operation === 'add'
        ? addItemToWishlist(producttoAddorRemove, datadispatch, wishlistItems)
        : removeItemFromWishlist(producttoAddorRemove._id, datadispatch);
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
          key={_id}
          className="text-white bg-pink-700  p-3 rounded-md w-3/5 font-bold"
          disabled={disabledButtons.includes(_id)}
          onClick={() => {
            isItemInCart(_id, cartItems) === -1
              ? AddToCartHander(product)
              : navigate('/cart');
            handleButtonClick(_id);
          }}
        >
          {isItemInCart(_id, cartItems) === -1 ? 'Add To Cart' : 'Go To Cart'}
        </button>
        <button
          key={_id}
          className=""
          disabled={wishlistDisabledButtons.includes(_id)}
          onClick={() => {
            AddToWishlistHander(
              product,
              isItemInWishlist(_id, wishlistItems) === -1 ? 'add' : 'remove'
            );
            handleWishlistButtonClick(_id);
          }}
        >
          {isItemInWishlist(_id, wishlistItems) === -1 ? (
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
