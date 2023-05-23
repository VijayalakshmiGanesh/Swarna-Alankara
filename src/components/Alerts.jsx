import { useContext } from 'react';
import { WishListContext } from '../contexts/WishListContext';

function Alerts({ message }) {
  const { showAlert, setShowAlert } = useContext(WishListContext);

  setTimeout(() => {
    setShowAlert(false);
  }, 5000);

  console.log('show alert in alert', showAlert);
  console.log('message', message);
  return (
    showAlert && (
      <>
        <div className="alert fixed bottom-[20px] right-[20px] p-4 bg-green-200 border-2 border-solid border-greeen-700 shadow-xl">
          {message}
        </div>
        <p
          style={{
            fontSize: '30rem',
            position: 'absolute',
            top: '1rem',
            left: '1rem',
            backgroundColor: 'lightgreen',
          }}
        >
          {message} Hellooo success it is
        </p>
      </>
    )
  );
}

export default Alerts;
