import { useContext } from 'react';

import ProductContext from '../contexts/ProductContext';
import Loader from '../components/Loader/Loader';
import ProductCard from '../components/ProductCard';

function Products() {
  const { filteredProducts, dispatch, loading, state } =
    useContext(ProductContext);

  function HandleFilters(filterType, valueToSend) {
    dispatch({ type: filterType, payload: valueToSend });
  }

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="flex  mx-auto py-4 px-2 flex-wrap">
          <div className="w-1/5  mx-auto  text-left px-5 py-5 min-w-fit border-r-2 border-blue-950 border-solid">
            <div className="fixed w-1/6">
              <p className="flex justify-between items-center my-1">
                <h3 className="text-blue-950 font-semibold text-xl tracking-wide uppercase">
                  Filters
                </h3>
                <button
                  className="text-white bg-pink-700  py-2 px-3 rounded-md w-3/5 font-bold w-fit"
                  onClick={() => dispatch({ type: 'reset' })}
                >
                  Reset
                </button>
              </p>
              <div>
                <p className="tracking-wide text-pink-700 font-semibold uppercase py-2">
                  Categories
                </p>
                <label className="text-blue-950 tracking-wide  px-2">
                  <input
                    type="checkbox"
                    value="Gold"
                    className="mr-1"
                    onChange={e => {
                      HandleFilters('categoryFilter', e.target.value);
                    }}
                    checked={state.categoryFilter.includes('Gold')}
                  />
                  Gold
                </label>
                <label className="text-blue-950 tracking-wide  py-2 px-2">
                  <input
                    type="checkbox"
                    value="Silver"
                    className="mr-1"
                    onChange={e =>
                      HandleFilters('categoryFilter', e.target.value)
                    }
                    checked={state.categoryFilter.includes('Silver')}
                  />
                  Silver
                </label>
              </div>
              <fieldset>
                <legend className="tracking-wide text-pink-700 font-semibold uppercase py-2">
                  Sub Categories
                </legend>
                <label className="text-blue-950 tracking-wide block px-2">
                  <input
                    type="checkbox"
                    value="Chains"
                    className="mr-1"
                    onChange={e =>
                      HandleFilters('subCategoryFilter', e.target.value)
                    }
                    checked={state.subCategoryFilter.includes('Chains')}
                  />
                  Chains
                </label>
                <label className="text-blue-950 tracking-wide block py-2 px-2">
                  <input
                    type="checkbox"
                    value="Earrings"
                    className="mr-1"
                    onChange={e =>
                      HandleFilters('subCategoryFilter', e.target.value)
                    }
                    checked={state.subCategoryFilter.includes('Earrings')}
                  />
                  Earrings
                </label>
                <label className="text-blue-950 tracking-wide block pb-2 px-2">
                  <input
                    type="checkbox"
                    value="Ring"
                    className="mr-1"
                    onChange={e =>
                      HandleFilters('subCategoryFilter', e.target.value)
                    }
                    checked={state.subCategoryFilter.includes('Ring')}
                  />
                  Rings
                </label>
              </fieldset>
              <fieldset>
                <legend className="tracking-wide text-pink-700 font-semibold uppercase py-2">
                  Rating Item
                </legend>
                <label className="text-blue-950 tracking-wide block  px-2">
                  <input
                    type="radio"
                    name="ratingFilter"
                    className="mr-1"
                    value="4.5"
                    onChange={e =>
                      HandleFilters('ratingsFilter', e.target.value)
                    }
                    checked={state.ratingsFilter.includes('4.5')}
                  />
                  4.5+
                </label>
                <label className="text-blue-950 tracking-wide block py-2 px-2">
                  <input
                    type="radio"
                    name="ratingFilter"
                    className="mr-1"
                    value="4.0"
                    onChange={e =>
                      HandleFilters('ratingsFilter', e.target.value)
                    }
                    checked={state.ratingsFilter.includes('4.0')}
                  />
                  4.0+
                </label>
                <label className="text-blue-950 tracking-wide block  px-2">
                  <input
                    type="radio"
                    name="ratingFilter"
                    className="mr-1"
                    value="3.5"
                    onChange={e =>
                      HandleFilters('ratingsFilter', e.target.value)
                    }
                    checked={state.ratingsFilter.includes('3.5')}
                  />
                  3.5+
                </label>
                <label className="text-blue-950 tracking-wide block py-2 px-2">
                  <input
                    type="radio"
                    name="ratingFilter"
                    className="mr-1 "
                    value="3.0"
                    onChange={e =>
                      HandleFilters('ratingsFilter', e.target.value)
                    }
                    checked={state.ratingsFilter.includes('3.0')}
                  />
                  3.0+
                </label>
                <label className="text-blue-950 tracking-wide block pb-2 px-2">
                  <input
                    type="radio"
                    name="ratingFilter"
                    className="mr-1"
                    value="all"
                    onChange={e =>
                      HandleFilters('ratingsFilter', e.target.value)
                    }
                    defaultChecked
                  />
                  All
                </label>
              </fieldset>
              <p className="tracking-wide text-pink-700 font-semibold uppercase py-2">
                Price
              </p>
              <input
                type="range"
                min="1"
                max="100000"
                step="5000"
                value={state.priceFilter}
                onChange={e =>
                  HandleFilters('priceFilter', Number(e.target.value))
                }
              ></input>
            </div>
          </div>
          <div className="flex-1">
            <div className="flex justify-between items-center mx-5 px-5">
              <h1 className="text-2xl text-blue-950 font-bold">Products</h1>
              <span>
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
              </span>
            </div>
            {filteredProducts?.length === 0 ? (
              <p>No products</p>
            ) : (
              <div className="flex flex-wrap mx-5 justify-center drop-shadow-lg ">
                {filteredProducts?.map(product => {
                  return <ProductCard product={product} />;
                })}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default Products;
