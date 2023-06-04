import { useContext, useEffect, useState } from 'react';
import { AddressContext } from '../contexts/AddressContext';
import { useDataContext } from '../contexts/DataContext';
import {
  addAddressToAddressBook,
  getAddressFromAPI,
  updateAddressInAddressBook,
} from '../services/address';

function AddAddressForm({ AddressToBeUpdated }) {
  const initialAddress = {
    name: '',
    street: '',
    city: '',
    state: '',
    country: '',
    zipCode: '',
    mobile: '',
  };
  const { setIsUserProfileDisplayed } = useContext(AddressContext);
  const [newAddressToBeAdded, setNewAddressToBeAdded] =
    useState(initialAddress);

  const { datadispatch } = useDataContext();

  useEffect(() => {
    getAddressFromAPI(datadispatch);
    if (AddressToBeUpdated !== 0) {
      setNewAddressToBeAdded(() => ({ ...AddressToBeUpdated }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <div className=" my-16 py-5 px-7 drop-shadow-lg w-[370px] border-2 border-solid border-gray-50 shadow-lg">
        <p className="text-2xl font-semibold text-center">
          {AddressToBeUpdated !== 0 ? 'Edit Address' : 'Add new address'}
        </p>
        <p className="text-gray-400 text-xs">
          Please enter all the details below
        </p>
        <div className="my-5 max-w-xs">
          <label className="flex flex-col my-5 w-full">
            <span className="text-xs text-left">Enter name</span>
            <input
              type="text"
              placeholder="Adarsh balika"
              className="text-left w-full border-gray-500 px-4 py-3 border-[1px] border-solid border-stone-300 "
              onChange={e =>
                setNewAddressToBeAdded(prev => ({
                  ...prev,
                  name: e.target.value,
                }))
              }
              value={newAddressToBeAdded.name}
              required
            />
          </label>
          <label className="flex flex-col mb-5">
            <span className="text-xs text-left">
              Enter door number, street name
            </span>
            <input
              type="text"
              placeholder="123, Greams Road 1st cross, "
              className=" text-left w-full border-gray-500 px-4 py-3 focus-visible:border-gray-800"
              onChange={e =>
                setNewAddressToBeAdded(prev => ({
                  ...prev,
                  street: e.target.value,
                }))
              }
              value={newAddressToBeAdded.street}
              required
            />
          </label>
          <label className="flex flex-col mb-5">
            <span className="text-xs text-left">Enter city</span>
            <input
              type="text"
              placeholder="Chennai "
              className=" text-left w-full border-gray-500 px-4 py-3 focus-visible:border-gray-800"
              onChange={e =>
                setNewAddressToBeAdded(prev => ({
                  ...prev,
                  city: e.target.value,
                }))
              }
              value={newAddressToBeAdded.city}
              required
            />
          </label>
          <label className="flex flex-col mb-5">
            <span className="text-xs text-left">Enter state</span>
            <input
              type="text"
              placeholder="Tamil Nadu"
              className=" text-left w-full border-gray-500 px-4 py-3 focus-visible:border-gray-800"
              onChange={e =>
                setNewAddressToBeAdded(prev => ({
                  ...prev,
                  state: e.target.value,
                }))
              }
              value={newAddressToBeAdded.state}
              required
            />
          </label>
          <label className="flex flex-col mb-5">
            <span className="text-xs text-left">Enter country</span>
            <input
              type="text"
              placeholder="India"
              className=" text-left w-full border-gray-500 px-4 py-3 focus-visible:border-gray-800"
              onChange={e =>
                setNewAddressToBeAdded(prev => ({
                  ...prev,
                  country: e.target.value,
                }))
              }
              value={newAddressToBeAdded.country}
              required
            />
          </label>
          <label className="flex flex-col mb-5">
            <span className="text-xs text-left">Enter pincode</span>
            <input
              type="text"
              placeholder="635001"
              className=" text-left w-full border-gray-500 px-4 py-3 focus-visible:border-gray-800"
              onChange={e =>
                setNewAddressToBeAdded(prev => ({
                  ...prev,
                  zipCode: e.target.value,
                }))
              }
              value={newAddressToBeAdded.zipCode}
              required
            />
          </label>
          <label className="flex flex-col mb-5">
            <span className="text-xs text-left">Enter mobile number</span>
            <input
              type="text"
              placeholder="7201572015"
              className=" text-left w-full border-gray-500 px-4 py-3 focus-visible:border-gray-800"
              onChange={e =>
                setNewAddressToBeAdded(prev => ({
                  ...prev,
                  mobile: e.target.value,
                }))
              }
              value={newAddressToBeAdded.mobile}
              required
            />
          </label>
          <div className="flex mb-5 ">
            {AddressToBeUpdated !== 0 ? (
              <button
                className="w-full text-white bg-pink-700 mx-1 p-3 rounded-md font-bold"
                onClick={() => {
                  updateAddressInAddressBook(
                    AddressToBeUpdated._id,
                    newAddressToBeAdded,
                    datadispatch
                  );

                  setIsUserProfileDisplayed(true);
                }}
              >
                Save
              </button>
            ) : (
              <button
                className="w-full text-white bg-pink-700 mx-1 p-3 rounded-md font-bold"
                onClick={() => {
                  addAddressToAddressBook(newAddressToBeAdded, datadispatch);

                  setIsUserProfileDisplayed(true);
                  setNewAddressToBeAdded(initialAddress);
                }}
              >
                Add address
              </button>
            )}
            <button
              className="w-full  text-white bg-pink-700 mx-1 p-3 rounded-md font-bold"
              onClick={() => setIsUserProfileDisplayed(true)}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddAddressForm;
