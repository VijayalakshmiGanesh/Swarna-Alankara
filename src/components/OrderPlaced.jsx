import Confetti from 'react-confetti';
import { useWindowSize } from '@uidotdev/usehooks';
function OrderPlaced() {
  const { width, height } = useWindowSize();

  return (
    <>
      <Confetti width={width - 50} height={height - 50} />
      <div className="flex justify-center items-center py-2 my-2 md:my-5 md:py-5 flex-col md:flex-row min-h-[70vh]">
        <img
          src="../assests/order_confirmed.svg"
          alt="order confirmed"
          height="500"
          width="500"
        ></img>
        <p className="text-2xl font-bold my-5 text-blue-950">
          Your Order is placed successfully
        </p>
      </div>
    </>
  );
}

export default OrderPlaced;
