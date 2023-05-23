import { useContext } from 'react';
import ProductContext from '../contexts/ProductContext';

function ProductFilters() {
  const { dispatch } = useContext(ProductContext);
  function HandleFilters(filterType, valueToSend) {
    dispatch({ type: filterType, payload: valueToSend });
    // console.log(messageFromAPI)
  }

  return (
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
  );
}
export default ProductFilters;
