import { createContext, useState } from 'react';
import { useNavigate } from 'react-router';
import { notifyError, notifySuccess } from '../components/Toasters';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const navigate = useNavigate();
  const [hasErrorOccured, setHasErrorOccured] = useState(false);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [loggedInUserDetails, setLoggedInUserDetails] = useState({});
  const LoginHandler = async (enteredEmail, enteredPassword) => {
    setIsUserLoggedIn('false');
    try {
      const response = await fetch('/api/auth/login', {
        method: 'post',

        body: JSON.stringify({
          email: enteredEmail,
          password: enteredPassword,
        }),
      });

      if (response.status === 200) {
        localStorage.setItem(
          'key',
          JSON.parse(response._bodyInit).encodedToken
        );
        setIsUserLoggedIn(true);
        setHasErrorOccured(false);
        setLoggedInUserDetails(JSON.parse(response._bodyInit).foundUser);
        navigate('/products');
        notifySuccess('Login Successful...');
      } else {
        console.log(response);
        if (response.statusText === 'Not Found') {
          setHasErrorOccured(true);
          setIsUserLoggedIn(false);
          notifyError('User credentials not found');
        }
      }
      console.log(response);
    } catch (e) {
      console.log(e);
    }
  };

  const SignUpHander = async (
    enteredEmail,
    enteredPassword,
    firstName,
    lastName
  ) => {
    setIsUserLoggedIn(false);
    try {
      const response = await fetch('/api/auth/signup', {
        method: 'post',
        body: JSON.stringify({
          email: enteredEmail,
          password: enteredPassword,
          lastName,
          firstName,
        }),
      });

      if (response.status === 201) {
        localStorage.setItem(
          'key',
          JSON.parse(response._bodyInit).encodedToken
        );
        setIsUserLoggedIn(true);
        setLoggedInUserDetails(JSON.parse(response._bodyInit).createdUser);

        navigate('/products');
        notifySuccess('Sign up Successfull');
      } else {
        setIsUserLoggedIn(false);
        notifyError(JSON.parse(response._bodyInit).errors[0]);
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <AuthContext.Provider
      value={{
        LoginHandler,
        hasErrorOccured,
        SignUpHander,
        isUserLoggedIn,
        loggedInUserDetails,
        setIsUserLoggedIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
