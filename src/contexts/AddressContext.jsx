import { createContext, useState } from 'react';

export const AddressContext = createContext();

export function AddressProvider({ children }) {
  const [isUserProfileDisplayed, setIsUserProfileDisplayed] = useState(true);
  const [addressToBeUpdatedObj, setAddressToBeUpdatedObj] = useState(0);

  return (
    <AddressContext.Provider
      value={{
        isUserProfileDisplayed,
        setIsUserProfileDisplayed,
        addressToBeUpdatedObj,
        setAddressToBeUpdatedObj,
      }}
    >
      {children}
    </AddressContext.Provider>
  );
}
