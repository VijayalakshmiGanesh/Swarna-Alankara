import { useContext } from 'react';
import { Navigate, useLocation } from 'react-router';
import { AuthContext } from '../contexts/AuthContext';

function RequiresAuth({ children }) {
  const { isUserLoggedIn } = useContext(AuthContext);
  const location = useLocation();

  return isUserLoggedIn ? (
    children
  ) : (
    <Navigate to="/login" state={{ from: location }} />
  );
}

export default RequiresAuth;
