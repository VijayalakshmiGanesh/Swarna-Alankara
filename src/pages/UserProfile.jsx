import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
// import { NavLink } from 'react-router-dom';

function UserProfile() {
  const { loggedInUserDetails } = useContext(AuthContext);
  const [address, setAddress] = useState([]);
  const getAddress = async () => {
    try {
      const response = await fetch('/api/user/address', {
        method: 'GET',
        headers: {
          authorization: localStorage.getItem('key'),
        },
      });
      if (response.status === 200) {
        setAddress(JSON.parse(response._bodyInit).address);
      }
      console.log(response);
    } catch (e) {
      console.log(e);
    }
  };

  const addAddressToAddressBook = async addressToAdd => {
    try {
      const response = await fetch('/api/user/address', {
        method: 'POST',
        headers: {
          authorization: localStorage.getItem('key'),
        },
        body: JSON.stringify({ address: addressToAdd }),
      });

      if (response.status === 201) {
        //  notifySuccess('Product added to cart');
      }
    } catch (e) {
      console.log(e);
    } finally {
      getAddress();
    }
  };

  const deleteAddressFromAddressBook = async addressToBeDeletedID => {
    try {
      const response = await fetch(
        `/api/user/address/${addressToBeDeletedID}`,
        {
          method: 'DELETE',
          headers: {
            authorization: localStorage.getItem('key'),
          },
        }
      );
      if (response.status === 200) {
        //   notifySuccess('Product removed from cart');
      }
    } catch (e) {
      console.log(e);
    } finally {
      getAddress();
    }
  };

  const updateAddressInAddressBook = async (
    addressToBeUpdatedID,
    addressDetailToBeUpdated
  ) => {
    try {
      const response = await fetch(
        `/api/user/address/${addressToBeUpdatedID}`,
        {
          method: 'POST',
          headers: {
            authorization: localStorage.getItem('key'),
          },
          body: JSON.stringify({ address: addressDetailToBeUpdated }),
        }
      );
      console.log(
        'address to be updated id',
        addressToBeUpdatedID,
        'details',
        addressDetailToBeUpdated
      );
      if (response.status === 200) {
        //   notifySuccess('Product removed from cart');
      }
      console.log('update', response);
    } catch (e) {
      console.log(e);
    } finally {
      getAddress();
    }
  };
  useEffect(() => {
    getAddress();
  }, []);

  return (
    <>
      <div className="relative flex justify-center items-center text-left ">
        {/* <div className='w-[400px] h-[400px] p-5 bg-white shadow-lg h-full flex flex-col items-center border-1 border-solid border-slate-700'> */}
        <div className=" my-16 py-5 px-7 drop-shadow-lg w-[370px] border-2 border-solid border-gray-50 shadow-lg">
          {/* <p className="text-gray-400 text-xs text-center">
            User account details
          </p> */}
          <div className="my-5 max-w-xs">
            <div className="pb-2">
              <p className="text-2xl font-semibold text-center underline decoration-1 underline-offset-4 pb-4">
                User account details
              </p>
              <p className="my-1">
                <span className="font-semibold">Username:</span>
                <span className="text-slate-900 px-1 ">
                  {loggedInUserDetails.firstName} {loggedInUserDetails.lastName}
                </span>
              </p>
              <p className="my-1">
                <span className="font-semibold">E-mail:</span>
                <span className="text-slate-900 px-1 ">
                  {loggedInUserDetails.email}
                </span>
              </p>
            </div>
            <div className="py-2">
              <p className="text-2xl font-semibold text-center underline decoration-1 underline-offset-4 ">
                Address details
              </p>
              {address?.length === 0 ? (
                <p>No address available</p>
              ) : (
                address.map(i => {
                  const {
                    _id,
                    name,
                    street,
                    city,
                    state,
                    country,
                    zipCode,
                    mobile,
                  } = i;
                  return (
                    <div key={_id} className="mt-3">
                      <p className="font-semibold">{name}</p>
                      <p className="text-slate-700 text-sm ">
                        {`${street}, ${city}, ${state}, ${country} `}
                      </p>
                      <p className="text-slate-700 text-sm ">{zipCode}</p>
                      <p className="text-slate-700 text-sm ">{`Phone Number: ${mobile}`}</p>
                      <p className="flex">
                        <button
                          className="rounded-full w-3/4 my-3 py-1 bg-pink-700 text-white hover:bg-white hover:text-pink-700 hover:border-pink-700 hover:border-solid hover:border-2 hover:font-semibold  my-1 px-2 py-1"
                          onClick={() => deleteAddressFromAddressBook(_id)}
                        >
                          Delete
                        </button>
                        <button
                          className="rounded-full w-3/4 my-3 py-1 bg-pink-700 text-white hover:bg-white hover:text-pink-700 hover:border-pink-700 hover:border-solid hover:border-2 hover:font-semibold mx-3  my-1 px-2 py-1"
                          onClick={() =>
                            updateAddressInAddressBook(_id, {
                              _id,
                              name: 'Remo',
                              street: '123, Dubai kuruku sandu',
                              city: 'Dubai',
                              state: 'Abu dhabi ',
                              country: 'UAE',
                              zipCode: '74AA14',
                              mobile: '+133 - 98751200',
                            })
                          }
                        >
                          Update
                        </button>
                      </p>
                    </div>
                  );
                })
              )}
            </div>
            <button
              className="rounded-full w-full bg-pink-700 text-white hover:bg-white hover:text-pink-700 hover:border-pink-700 hover:border-solid hover:border-2 hover:font-semibold  my-1 px-2 py-1"
              onClick={() =>
                addAddressToAddressBook({
                  name: 'Remo',
                  street: '123, ADB Street',
                  city: 'Dubai',
                  state: 'Abu dhabi ',
                  country: 'UAE',
                  zipCode: '74AA14',
                  mobile: '+12298751200',
                })
              }
            >
              Add new address
            </button>
            <div className="flex mb-5 ">
              <button className="w-full text-white bg-red-700 mx-1 p-3 rounded-md font-bold">
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserProfile;
