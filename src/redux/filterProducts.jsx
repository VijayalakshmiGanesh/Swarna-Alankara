//Reducer Function
export const filterProductReducer = (result, action) => {
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
      return { ...result, priceFilter: action.payload };
    case 'reset':
      return {
        sortData: 'recommended',
        search: '',
        categoryFilter: [],
        subCategoryFilter: [],
        ratingsFilter: '',
        priceFilter: 100000,
      };
    default:
      return result;
  }
};

export const filtersInitialState = {
  sortData: 'recommended',
  search: '',
  categoryFilter: [],
  subCategoryFilter: [],
  ratingsFilter: 'all',
  priceFilter: 100000,
};

export const filterProductData = (products, state) => {
  let newfilteredData = [...products];

  //sort
  newfilteredData =
    products?.length > 0
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
        : [...products]
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

  // //price filter
  newfilteredData =
    [...newfilteredData]?.length >= 0 &&
    state?.priceFilter > 0 &&
    newfilteredData?.filter(({ price }) => price <= state.priceFilter);

  return newfilteredData;
};
