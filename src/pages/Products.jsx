/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { useDataContext } from '../contexts/DataContext';
import Loader from '../components/Loader/Loader';
import ProductCard from '../components/ProductCard';
import { filterProductData } from '../redux/filterProducts';
import { FaFilter } from 'react-icons/fa';
import { IoCloseSharp } from 'react-icons/io5';
import { useLocation } from 'react-router';
function Products() {
  const {
    products,
    filterdispatch,
    loading,
    filterProductState,
    setLoading,
    SetTextToSearch,
  } = useDataContext();
  const location = useLocation();
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [showFilter, setShowFilter] = useState(false);
  function HandleFilters(filterType, valueToSend) {
    filterdispatch({ type: filterType, payload: valueToSend });
  }

  useEffect(() => {
    setLoading(() => true);
    setFilteredProducts(filterProductData(products, filterProductState));
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, [products, filterProductState]);

  useEffect(() => {
    if (location?.state?.from === undefined) {
      SetTextToSearch('');
      filterdispatch({ type: 'reset' });
    }
  }, []);
  return (
    <>
      <div>
        <div className="flex-1">
          <div className="flex justify-between items-center mx-5 px-5 my-3">
            <h1 className="text-2xl text-blue-950 font-bold">Products</h1>
            <span className="flex items-center">
              <button
                onClick={() => setShowFilter(prev => !prev)}
                className="fixed  bottom-12 right-5 z-50 rounded-full border border-2 text-[#efa939] bg-blue-950 p-3 text-xl shadow-lg sm:static sm:text-md sm:mx-3 sm:text-blue-950 sm:bg-white sm:border-2 sm:border-blue-950 "
              >
                {showFilter ? (
                  <IoCloseSharp className="z-50" />
                ) : (
                  <FaFilter className="z-50" />
                )}
              </button>
              <span>
                <h3>Sort By</h3>
                <select
                  onChange={e =>
                    filterdispatch({
                      type: 'sort',
                      payload: e.target.value,
                    })
                  }
                  value={filterProductState.sortData}
                >
                  <option value="recommended" selected>
                    Recommended
                  </option>
                  <option value="lowToHigh">Price (Low to High)</option>
                  <option value="highToLow">Price (High to Low)</option>
                  <option value="ratings">Customer Ratings</option>
                </select>
              </span>
            </span>
          </div>
          <div className={`${showFilter ? 'block' : 'hidden'}`}>
            <div>
              <p className="flex justify-around sm:justify-center items-center my-1">
                <h3 className="text-blue-950 font-semibold text-xl tracking-wide uppercase">
                  Filters
                </h3>
                <button
                  className="text-white bg-pink-700  py-2 px-3 rounded-md w-3/5 font-bold w-fit mx-3"
                  onClick={() => filterdispatch({ type: 'reset' })}
                >
                  Reset
                </button>
              </p>
              <div className="">
                <div className="flex flex-col items-center justify-center">
                  <p className=" tracking-wide text-pink-700 font-semibold uppercase py-2">
                    Categories
                  </p>
                  <div>
                    <label className="text-blue-950 tracking-wide  px-2">
                      <input
                        type="checkbox"
                        value="Gold"
                        className="mr-1"
                        onChange={e => {
                          HandleFilters('categoryFilter', e.target.value);
                        }}
                        checked={filterProductState.categoryFilter.includes(
                          'Gold'
                        )}
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
                        checked={filterProductState.categoryFilter.includes(
                          'Silver'
                        )}
                      />
                      Silver
                    </label>
                  </div>
                </div>
                <div className="flex flex-col items-center">
                  <p className="tracking-wide text-pink-700 font-semibold uppercase py-2">
                    Sub Categories
                  </p>
                  <div className="flex">
                    <label className="text-blue-950 tracking-wide block px-2">
                      <input
                        type="checkbox"
                        value="Chains"
                        className="mr-1"
                        onChange={e =>
                          HandleFilters('subCategoryFilter', e.target.value)
                        }
                        checked={filterProductState.subCategoryFilter.includes(
                          'Chains'
                        )}
                      />
                      Chains
                    </label>
                    <label className="text-blue-950 tracking-wide block px-2">
                      <input
                        type="checkbox"
                        value="Earrings"
                        className="mr-1"
                        onChange={e =>
                          HandleFilters('subCategoryFilter', e.target.value)
                        }
                        checked={filterProductState.subCategoryFilter.includes(
                          'Earrings'
                        )}
                      />
                      Earrings
                    </label>
                    <label className="text-blue-950 tracking-wide block  px-2">
                      <input
                        type="checkbox"
                        value="Ring"
                        className="mr-1"
                        onChange={e =>
                          HandleFilters('subCategoryFilter', e.target.value)
                        }
                        checked={filterProductState.subCategoryFilter.includes(
                          'Ring'
                        )}
                      />
                      Rings
                    </label>
                  </div>
                </div>
                <div className="flex flex-col items-center">
                  <p className="tracking-wide text-pink-700 font-semibold uppercase py-2">
                    Rating Item
                  </p>
                  <div className="flex">
                    <label className="text-blue-950 tracking-wide block  px-2">
                      <input
                        type="radio"
                        name="ratingFilter"
                        className="mr-1"
                        value="4.5"
                        onChange={e =>
                          HandleFilters('ratingsFilter', e.target.value)
                        }
                        checked={filterProductState.ratingsFilter.includes(
                          '4.5'
                        )}
                      />
                      4.5+
                    </label>
                    <label className="text-blue-950 tracking-wide block  px-2">
                      <input
                        type="radio"
                        name="ratingFilter"
                        className="mr-1"
                        value="4.0"
                        onChange={e =>
                          HandleFilters('ratingsFilter', e.target.value)
                        }
                        checked={filterProductState.ratingsFilter.includes(
                          '4.0'
                        )}
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
                        checked={filterProductState.ratingsFilter.includes(
                          '3.5'
                        )}
                      />
                      3.5+
                    </label>
                    <label className="text-blue-950 tracking-wide block  px-2">
                      <input
                        type="radio"
                        name="ratingFilter"
                        className="mr-1 "
                        value="3.0"
                        onChange={e =>
                          HandleFilters('ratingsFilter', e.target.value)
                        }
                        checked={filterProductState.ratingsFilter.includes(
                          '3.0'
                        )}
                      />
                      3.0+
                    </label>
                    <label className="text-blue-950 tracking-wide block px-2">
                      <input
                        type="radio"
                        name="ratingFilter"
                        className="mr-1"
                        value="all"
                        onChange={e =>
                          HandleFilters('ratingsFilter', e.target.value)
                        }
                        checked={filterProductState.ratingsFilter.includes(
                          'all'
                        )}
                      />
                      All
                    </label>
                  </div>
                </div>
                <p className="tracking-wide text-pink-700 font-semibold uppercase py-2">
                  Price
                </p>
                <p className="flex items-center justify-center">
                  <input
                    type="range"
                    min="1"
                    max="100000"
                    step="5000"
                    value={filterProductState.priceFilter}
                    onChange={e =>
                      HandleFilters('priceFilter', Number(e.target.value))
                    }
                  ></input>
                  <span className="px-1 border border-2 mx-1">
                    {filterProductState.priceFilter}
                  </span>
                </p>
              </div>
            </div>
          </div>
          {loading ? (
            <Loader className="relative top-16" />
          ) : filteredProducts?.length === 0 ? (
            <p className="text-xl text-pink-700 font-semibold">
              No products to display
            </p>
          ) : (
            <div className="flex flex-wrap mx-5 justify-center drop-shadow-lg ">
              {filteredProducts?.map(product => {
                return <ProductCard product={product} />;
              })}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Products;
