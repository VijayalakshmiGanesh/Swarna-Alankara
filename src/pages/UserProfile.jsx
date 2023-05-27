import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';

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
      <div>
        <h1>User Profile </h1>
        <p>
          Name: {loggedInUserDetails.firstName} {loggedInUserDetails.lastName}
        </p>
        <p>E-mail: {loggedInUserDetails.email}</p>
        <button>Logout</button>
      </div>
      <div>
        <h1>Address</h1>
        {address?.length === 0 ? (
          <p>No address available</p>
        ) : (
          address.map(i => {
            const { _id, name, street, city, state, country, zipCode, mobile } =
              i;
            return (
              <div key={_id}>
                <p>
                  {`${name}, ${street}, ${city}, ${state}, ${country} - ${zipCode}`}
                </p>
                <p>{`${mobile}`}</p>
                <button
                  className="rounded-full bg-pink-700 text-white hover:bg-white hover:text-pink-700 hover:border-pink-700 hover:border-solid hover:border-2 hover:font-semibold  my-1 px-2 py-1"
                  onClick={() => deleteAddressFromAddressBook(_id)}
                >
                  Delete
                </button>
                <button
                  className="rounded-full bg-pink-700 text-white hover:bg-white hover:text-pink-700 hover:border-pink-700 hover:border-solid hover:border-2 hover:font-semibold  my-1 px-2 py-1"
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
                <hr />
              </div>
            );
          })
        )}
        <button
          className="rounded-full bg-pink-700 text-white hover:bg-white hover:text-pink-700 hover:border-pink-700 hover:border-solid hover:border-2 hover:font-semibold  my-1 px-2 py-1"
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
          Add address
        </button>
      </div>
    </>
  );
}

export default UserProfile;
