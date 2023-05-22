import { useContext, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { BiSearchAlt2 } from 'react-icons/bi';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';

import ProductContext from '../contexts/ProductContext';
import { AuthContext } from '../contexts/AuthContext';
import { CartContext } from '../contexts/CartContext';
import { WishListContext } from '../contexts/WishListContext';
import Loader from '../components/Loader/Loader';

function Products() {
  const { filteredProducts, dispatch, loading } = useContext(ProductContext);
  const { isUserLoggedIn } = useContext(AuthContext);
  const { addItemToCart, isItemInCart } = useContext(CartContext);

  const [textToSearch, SetTextToSearch] = useState('');
  const navigate = useNavigate();

  const { isItemInWishlist, addItemToWishlist, removeItemFromWishlist } =
    useContext(WishListContext);

  function HandleFilters(filterType, valueToSend) {
    dispatch({ type: filterType, payload: valueToSend });
    // console.log(messageFromAPI)
  }

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
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="flex container mx-auto">
          <div className="w-1/5 h-full mx-auto sticky bg-gray-200 h-screen text-left px-5 py-5 border-r-4 border-indigo-500">
            <h3>Filters</h3>
            <fieldset>
              <legend>Categories</legend>
              <input
                type="checkbox"
                value="Gold"
                onChange={e => HandleFilters('categoryFilter', e.target.value)}
              />{' '}
              Gold
              <input
                type="checkbox"
                value="Silver"
                onChange={e => HandleFilters('categoryFilter', e.target.value)}
              />{' '}
              Silver
            </fieldset>
            <fieldset>
              <legend>Sub Categories</legend>
              <input
                type="checkbox"
                value="Chains"
                onChange={e =>
                  HandleFilters('subCategoryFilter', e.target.value)
                }
              />{' '}
              Chains
              <input
                type="checkbox"
                value="Earrings"
                onChange={e =>
                  HandleFilters('subCategoryFilter', e.target.value)
                }
              />{' '}
              Earrings
              <input
                type="checkbox"
                value="Ring"
                onChange={e =>
                  HandleFilters('subCategoryFilter', e.target.value)
                }
              />{' '}
              Rings
            </fieldset>
            <fieldset>
              <legend>Rating Item</legend>
              <input
                type="radio"
                name="ratingFilter"
                value="4.5"
                onChange={e => HandleFilters('ratingsFilter', e.target.value)}
              />{' '}
              4.5+
              <input
                type="radio"
                name="ratingFilter"
                value="4.0"
                onChange={e => HandleFilters('ratingsFilter', e.target.value)}
              />{' '}
              4.0+
              <input
                type="radio"
                name="ratingFilter"
                value="3.5"
                onChange={e => HandleFilters('ratingsFilter', e.target.value)}
              />{' '}
              3.5+
              <input
                type="radio"
                name="ratingFilter"
                value="3.0"
                onChange={e => HandleFilters('ratingsFilter', e.target.value)}
              />{' '}
              3.0+
              <input
                type="radio"
                name="ratingFilter"
                value="all"
                onChange={e => HandleFilters('ratingsFilter', e.target.value)}
                defaultChecked
              />{' '}
              All
            </fieldset>
            <fieldset>
              <legend>Price</legend>
              <input
                type="checkbox"
                value="30001-1000000"
                onChange={e => HandleFilters('priceFilter', e.target.value)}
              />{' '}
              Above 30000
              <input
                type="checkbox"
                value="10001-30000"
                onChange={e => HandleFilters('priceFilter', e.target.value)}
              />{' '}
              10000 - 30000
              <input
                type="checkbox"
                value="1001-10000"
                onChange={e => HandleFilters('priceFilter', e.target.value)}
              />{' '}
              1000 - 10000
              <input
                type="checkbox"
                value="0-1000"
                onChange={e => HandleFilters('priceFilter', e.target.value)}
              />{' '}
              Below 1000
            </fieldset>
          </div>
          <div className="flex-1">
            <h1>Products</h1>
            <h3>Sort By</h3>
            <select
              onChange={e =>
                dispatch({ type: 'sort', payload: e.target.value })
              }
            >
              <option value="recommended">Recommended</option>
              <option value="lowToHigh">Price (Low to High)</option>
              <option value="highToLow">Price (High to Low)</option>
              <option value="ratings">Customer Ratings</option>
            </select>
            Search:{' '}
            <input
              type="text"
              placeholder="Enter the product name"
              onChange={e => SetTextToSearch(e.target.value)}
            />
            <button
              onClick={() =>
                dispatch({ type: 'search', payload: textToSearch })
              }
            >
              Search
              <span>
                <BiSearchAlt2 />
              </span>
            </button>
            {filteredProducts?.length === 0 ? (
              <p>No products</p>
            ) : (
              // <div
              //   style={{
              //     display: 'flex',
              //     flexWrap: 'wrap',
              //     alignContent: 'center',
              //     justifyContent: 'center',
              //   }}
              // >
              <div className="flex flex-wrap mx-5 justify-center drop-shadow-lg">
                {filteredProducts?.map(product => {
                  const { _id, title, imageURL, price, rating } = product;
                  return (
                    // <div className="flex flex-wrap">
                    <div
                      className="flex flex-col px-2 py-2 m-3 h-[31rem] w-[15rem] border-2 border-zinc-300 shadow-lg rounded-lg bg-gray-100"
                      key={_id}
                    >
                      <NavLink
                        to={`/product-detail/${_id}`}
                        className="flex flex-col"
                      >
                        <img
                          src={imageURL}
                          className="object-cover h-3/4 py-3"
                          alt={`${title} thumbnail`}
                          style={{ height: 320 }}
                        />
                        <div className="grow my-1">
                          <p className="text-blue-900 font-semibold text-lg">
                            {title}
                          </p>
                          <p className="my-1">
                            <span className="text-pink-700 font-bold">
                              Rs. {price}/-
                            </span>
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
                          {isItemInCart(_id) === -1
                            ? 'Add To Cart'
                            : 'Go To Cart'}
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
                            // <span className="">
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
                            // </span>
                          )}
                        </button>
                      </p>
                    </div>
                    // </div>
                    // <div
                    //   key={_id}
                    //   style={{
                    //     border: '1px solid',
                    //     margin: '0.5rem',
                    //     width: '250px',
                    //   }}
                    //   className="flex flex-col justify-center items-center"
                    // >
                    //   <img
                    //     src={imageURL}
                    //     alt={`${title}`}
                    //     height="150"
                    //     width="250"
                    //   />
                    //   <h2 className="banner-text">{title}</h2>
                    //   <p>price: {price}</p>
                    //   <p>Rating: {rating}</p>
                    //   <NavLink to={`/product-detail/${_id}`}>Go</NavLink>
                    //   <button
                    //     className="text-white bg-pink-700  p-3 rounded-md w-4/5 font-bold"
                    //     onClick={() =>
                    //       isItemInCart(_id) === -1
                    //         ? AddToCartHander(product)
                    //         : navigate('/cart')
                    //     }
                    //   >
                    //     {isItemInCart(_id) === -1
                    //       ? 'Add To Cart'
                    //       : 'Go To Cart'}
                    //   </button>
                    //   <button
                    //     onClick={() =>
                    //       AddToWishlistHander(
                    //         product,
                    //         isItemInWishlist(_id) === -1 ? 'add' : 'remove'
                    //       )
                    //     }
                    //   >
                    //     {isItemInWishlist(_id) === -1
                    //       ? 'Add to Wishlist'
                    //       : 'Remove from Wishlist'}
                    //   </button>
                    // </div>
                  );
                })}
              </div>
              // </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default Products;
