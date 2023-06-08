import { notifyError, notifySuccess } from '../components/Toasters';

export const getAddressFromAPI = async dataDispatch => {
  // setLoading(true);
  try {
    const response = await fetch('/api/user/address', {
      method: 'GET',
      headers: {
        authorization: localStorage.getItem('key'),
      },
    });
    if (response.status === 200) {
      dataDispatch({
        type: 'AddressList',
        payload: JSON.parse(response._bodyInit).address,
      });
      //   setAddress(JSON.parse(response._bodyInit).address);
    }
  } catch (e) {
    console.log(e);
  } finally {
    // setLoading(false);
  }
};

export const addAddressToAddressBook = async (addressToAdd, dataDispatch) => {
  // setLoading(true);
  try {
    const response = await fetch('/api/user/address', {
      method: 'POST',
      headers: {
        authorization: localStorage.getItem('key'),
      },
      body: JSON.stringify({ address: addressToAdd }),
    });

    console.log('Address to add', addressToAdd);
    if (response.status === 201) {
      notifySuccess('New address added to address book');
    } else {
      notifyError('Some error occured. Try again later');
    }
    console.log('Add addres response', response);
  } catch (e) {
    console.log(e);
  } finally {
    getAddressFromAPI(dataDispatch);
    // setLoading(false);
  }
};

export const updateAddressInAddressBook = async (
  addressToBeUpdatedID,
  addressDetailToBeUpdated,
  dataDispatch
) => {
  // setLoading(true);
  try {
    const response = await fetch(`/api/user/address/${addressToBeUpdatedID}`, {
      method: 'POST',
      headers: {
        authorization: localStorage.getItem('key'),
      },
      body: JSON.stringify({ address: addressDetailToBeUpdated }),
    });
    if (response.status === 200) {
      notifySuccess('Address updated successfully');
    } else {
      notifyError('Some error occured. Please try again later');
    }
  } catch (e) {
    console.log(e);
  } finally {
    getAddressFromAPI(dataDispatch);
    // setLoading(false);
  }
};

export const deleteAddressFromAddressBook = async (
  addressToBeDeletedID,
  dataDispatch
) => {
  try {
    const response = await fetch(`/api/user/address/${addressToBeDeletedID}`, {
      method: 'DELETE',
      headers: {
        authorization: localStorage.getItem('key'),
      },
    });
    if (response.status === 200) {
      notifySuccess('Address deleted successfully');
    } else {
      notifyError('Some error occured. Please try again later');
    }
  } catch (e) {
    console.log(e);
  } finally {
    getAddressFromAPI(dataDispatch);
  }
};
