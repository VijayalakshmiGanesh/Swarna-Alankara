import { createContext, useEffect, useReducer, useState } from 'react';

export const ProductContext = createContext();

export function ProductProvider({ children }) {
  const [productList, setProductList] = useState();
  const [loading, setLoading] = useState(false);
  const getDataFromAPI = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/products');

      if (response.status === 200) {
        setProductList(JSON.parse(response._bodyInit).products);
        setFilteredProducts(JSON.parse(response._bodyInit).products);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getDataFromAPI();
  }, []);

  const [filteredProducts, setFilteredProducts] = useState(productList);

  //Reducer Function
  const ProductReducer = (result, action) => {
    switch (action.type) {
      case 'sort':
        return { ...result, sortData: action.payload };
      case 'search':
        return { ...result, search: action.payload };
      case 'categoryFilter':
        return {
          ...result,
          categoryFilter: result.categoryFilter.includes(action.payload)
            ? result.categoryFilter.filter(item => item !== action.payload)
            : [...result.categoryFilter, action.payload],
        };
      case 'subCategoryFilter':
        return {
          ...result,
          subCategoryFilter: result.subCategoryFilter.includes(action.payload)
            ? result.subCategoryFilter.filter(item => item !== action.payload)
            : [...result.subCategoryFilter, action.payload],
        };
      case 'ratingsFilter':
        return { ...result, ratingsFilter: action.payload };
      case 'priceFilter':
        return {
          ...result,
          priceFilter: result.priceFilter.includes(action.payload)
            ? result.priceFilter.filter(item => item !== action.payload)
            : [...result.priceFilter, action.payload],
        };
      default:
        return result;
    }
  };

  const [state, dispatch] = useReducer(ProductReducer, {
    sortData: 'recommended',
    search: '',
    categoryFilter: [],
    subCategoryFilter: [],
    ratingsFilter: '',
    priceFilter: [],
  });

  const filterProductData = () => {
    let newfilteredData = productList;

    //sort - check default recommended
    newfilteredData =
      productList?.length > 0
        ? state.sortData !== 'recommended'
          ? [
              ...newfilteredData.sort((a, b) => {
                switch (state.sortData) {
                  case 'lowToHigh':
                    return Number(a.price) - Number(b.price);
                  case 'highToLow':
                    return Number(b.price) - Number(a.price);
                  case 'ratings':
                    return Number(b.rating) - Number(a.rating);
                  default:
                    return true;
                }
              }),
            ]
          : [...productList]
        : newfilteredData;

    //search
    newfilteredData =
      state.search.trim().length === 0
        ? newfilteredData
        : newfilteredData.filter(({ title }) =>
            title.toLowerCase().includes(state.search.toLowerCase())
          );

    //Category filter
    newfilteredData =
      state.categoryFilter.length === 0
        ? newfilteredData
        : newfilteredData.filter(product =>
            state.categoryFilter.includes(product.categoryName)
          );

    //Sub-Category filter
    newfilteredData =
      state.subCategoryFilter.length === 0
        ? newfilteredData
        : newfilteredData.filter(product =>
            state.subCategoryFilter.includes(product.subCategory)
          );

    //Rating filter
    newfilteredData =
      state.ratingsFilter.length === 0
        ? newfilteredData
        : state.ratingsFilter === 'all'
        ? newfilteredData
        : newfilteredData.filter(
            ({ rating }) => rating >= Number(state.ratingsFilter)
          );

    //price filter
    newfilteredData =
      state.priceFilter.length === 0
        ? newfilteredData
        : state.priceFilter
            .map(range => {
              const [min, max] = range.split('-').map(Number);
              return newfilteredData.filter(
                product => product.price >= min && product.price <= max
              );
            })
            .reduce((acc, curr) => [...acc, ...curr], []);

    return newfilteredData;
  };

  useEffect(() => {
    setFilteredProducts(filterProductData());
  }, [productList, state]);

  return (
    <ProductContext.Provider
      value={{
        productList,
        filteredProducts,
        state,
        dispatch,
        loading,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export default ProductContext;
