export const getProductsFromAPI = async dataDispatch => {
  dataDispatch({ type: 'setLoading', payload: 'true' });
  try {
    const response = await fetch('/api/products');

    if (response.status === 200) {
      dataDispatch({
        type: 'ProductList',
        payload: JSON.parse(response._bodyInit).products,
      });
      //   setFilteredProducts(JSON.parse(response._bodyInit).products);
    }
  } catch (e) {
    console.log(e);
  } finally {
    dataDispatch({ type: 'setLoading', payload: 'false' });
  }
};
