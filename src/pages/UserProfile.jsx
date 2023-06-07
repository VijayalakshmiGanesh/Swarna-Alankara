import { useContext, useEffect } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import AddAddressForm from '../components/AddAddressForm';
import { AddressContext } from '../contexts/AddressContext';
import { useLocation, useNavigate } from 'react-router';
import { useDataContext } from '../contexts/DataContext';
import {
  deleteAddressFromAddressBook,
  getAddressFromAPI,
} from '../services/address';
import { notifySuccess } from '../components/Toasters';
// import { NavLink } from 'react-router-dom';

function UserProfile() {
  const { loggedInUserDetails, setIsUserLoggedIn } = useContext(AuthContext);

  const { addressBook, datadispatch } = useDataContext();
  const {
    isUserProfileDisplayed,
    setIsUserProfileDisplayed,
    addressToBeUpdatedObj,
    setAddressToBeUpdatedObj,
  } = useContext(AddressContext);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    getAddressFromAPI(datadispatch);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="relative flex justify-center items-center text-left ">
        {isUserProfileDisplayed ? (
          <div className=" my-16 py-5 px-7 drop-shadow-lg w-[370px] border-2 border-solid border-gray-50 shadow-lg">
            <div className="my-5 max-w-xs">
              <div className="pb-2">
                <p className="text-2xl font-semibold text-center underline decoration-1 underline-offset-4 pb-4">
                  User account details
                </p>
                <p className="my-1">
                  <span className="font-semibold">Username:</span>
                  <span className="text-slate-900 px-1 ">
                    {loggedInUserDetails.firstName}
                    {loggedInUserDetails.lastName}
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
                {addressBook?.length === 0 ? (
                  <p>No address available</p>
                ) : (
                  addressBook?.map(i => {
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
                            onClick={() =>
                              deleteAddressFromAddressBook(_id, datadispatch)
                            }
                          >
                            Delete
                          </button>
                          <button
                            className="rounded-full w-3/4 my-3 py-1 bg-pink-700 text-white hover:bg-white hover:text-pink-700 hover:border-pink-700 hover:border-solid hover:border-2 hover:font-semibold mx-3  my-1 px-2 py-1"
                            onClick={() => {
                              setIsUserProfileDisplayed(prev => !prev);
                              setAddressToBeUpdatedObj(i);
                            }}
                          >
                            Edit
                          </button>
                        </p>
                      </div>
                    );
                  })
                )}
              </div>
              <button
                className="rounded-full w-full bg-pink-700 text-white hover:bg-white hover:text-pink-700 hover:border-pink-700 hover:border-solid hover:border-2 hover:font-semibold  my-1 px-2 py-1"
                onClick={() => {
                  setIsUserProfileDisplayed(prev => !prev);
                  setAddressToBeUpdatedObj(0);
                }}
              >
                Add new address
              </button>
              <div className="flex mb-5 mt-2">
                <button
                  className="w-full text-white bg-red-700 mx-1 p-3 rounded-md font-bold"
                  onClick={() => {
                    setIsUserLoggedIn(prev => !prev);
                    navigate(location?.state?.from?.pathname);
                    datadispatch({ type: 'logout' });
                    notifySuccess('Logged out successfully');
                    localStorage.clear();
                  }}
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <AddAddressForm AddressToBeUpdated={addressToBeUpdatedObj} />
          </div>
        )}
      </div>
    </>
  );
}

export default UserProfile;
