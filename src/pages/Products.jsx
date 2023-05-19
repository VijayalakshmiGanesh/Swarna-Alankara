import { useContext, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { BiSearchAlt2 } from 'react-icons/bi';

import ProductContext from '../contexts/ProductContext';
import { AuthContext } from '../contexts/AuthContext';
import { CartContext } from '../contexts/CartContext';


function Products() {
  const { filteredProducts, dispatch } =
    useContext(ProductContext);
  const { isUserLoggedIn } = useContext(AuthContext);
  const {AddToCart, messageFromAPI} = useContext(CartContext)

  const [textToSearch, SetTextToSearch] = useState('');
  const navigate = useNavigate()

  function HandleFilters(filterType, valueToSend) {
    dispatch({ type: filterType, payload: valueToSend });
console.log(messageFromAPI)
  }


  function AddToCartHander(producttoAddinCart) {
    if (isUserLoggedIn) { 
      AddToCart(producttoAddinCart)
    }
    else {
      navigate("/login")
    }
  }

  return (
    <>
      
      <div className='flex container mx-auto'>
        <div className='w-1/5 h-full mx-auto sticky bg-gray-200 h-screen text-left px-5 py-5 border-r-4 border-indigo-500'>
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
            onChange={e => HandleFilters('subCategoryFilter', e.target.value)}
          />{' '}
          Chains
          <input
            type="checkbox"
            value="Earrings"
            onChange={e => HandleFilters('subCategoryFilter', e.target.value)}
          />{' '}
          Earrings
          <input
            type="checkbox"
            value="Ring"
            onChange={e => HandleFilters('subCategoryFilter', e.target.value)}
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
        <div className='flex-1'>
          <h1>Products</h1>
        <h3>Sort By</h3>
        <select
          onChange={e => dispatch({ type: 'sort', payload: e.target.value })}
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
          onClick={() => dispatch({ type: 'search', payload: textToSearch })}
        >
          Search
          <span>
            <BiSearchAlt2 />
          </span>
        </button>
      
      
      {filteredProducts?.length === 0 ? (
        <p>No products</p>
      ) : (
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignContent: 'center',
            justifyContent: 'center',
          }}
        >
            {filteredProducts?.map((product) => {
              const { _id, title, imageURL, price, rating, weight, categoryName, subCategory,  } = product;
              return (
            <div
              key={_id}
              style={{ border: '1px solid', margin: '0.5rem', width: '250px' }}
              className='flex flex-col justify-center items-center'
            >
              <img src={imageURL} alt={`${title}`} height="150" width="250" />
              <h2 className="banner-text">{title}</h2>
              <p>price: {price}</p>
              <p>Rating: {rating}</p>
              <NavLink to={`/product-detail/${_id}`}>Go</NavLink>
              <button className='text-white bg-pink-700  p-3 rounded-md w-4/5 font-bold' onClick={() => AddToCartHander(product)}>Add to Cart</button>
              <button>Add to WishList</button>
            </div>
          )})}
            </div>
           
        )}</div>
         </div>
    </>
  );
}

export default Products;
