export const getCategoriesFromAPI = async dataDispatch => {
  dataDispatch({ type: 'setLoading', payload: 'true' });
  try {
    const response = await fetch('/api/categories');
    if (response.status === 200) {
      dataDispatch({
        type: 'CategoryList',
        payload: JSON.parse(response._bodyInit).categories,
      });
    } else {
      //   console.log('Catgeory res', response);
    }
  } catch (e) {
    console.log(e);
  } finally {
    dataDispatch({ type: 'setLoading', payload: 'false' });
  }
};
