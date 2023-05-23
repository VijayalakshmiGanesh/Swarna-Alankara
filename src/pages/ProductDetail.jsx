import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AiOutlineHeart, AiOutlineShoppingCart } from 'react-icons/ai';
import ReactStars from 'react-stars';
import { CartContext } from '../contexts/CartContext';
import { WishListContext } from '../contexts/WishListContext';
import Loader from '../components/Loader/Loader';

function ProductDetail() {
  const { id } = useParams();
  const { isItemInCart, AddToCartHander } = useContext(CartContext);
  const { isItemInWishlist, AddToWishlistHander } = useContext(WishListContext);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const [productToBeDisplayed, setProducToBeDisplayed] = useState({});
  const getProductDetails = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/products/${id}`);

      if (response.status === 200) {
        setProducToBeDisplayed(JSON.parse(response._bodyInit).product);
      }
      console.log('product-detail', response);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProductDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const {
    _id,
    title,
    imageURL,
    categoryName,
    subCategory,
    weight,
    rating,
    price,
  } = productToBeDisplayed;
  return (
    <>
      {/* <div className="relative h-[130px] bg-neutral-300">
                <div className="absolute inset-0 flex items-center justify-center">
                    <h1 className="text-4xl font-bold text-[#efa939]">Product Details</h1>
                </div>
        </div> */}
      {loading ? (
        <Loader />
      ) : (
        <div className="container mx-auto xl:py-7  xl:my-7 flex justify-center">
          <div className=" w-[750px] md:h-[400px] border-2 border-solid shadow-2xl flex p-5 flex-col md:flex-row min-h-fit m-3 md:m-none rounded-lg ">
            <img
              src={imageURL}
              alt="title"
              width="350"
              className="object-cover"
            />
            <div className="px-5 py-3 text-blue-900 text-left">
              <h2 className="font-bold text-2xl product-title text-left">
                {title}
              </h2>
              <p className="flex items-center">
                <span>
                  <ReactStars
                    count={5}
                    value={rating}
                    size={24}
                    color2={'#efa939'}
                  />
                </span>
                <span className="px-1">({rating})</span>
              </p>
              <p className="text-pink-700 font-bold">Rs. {price}/-</p>
              <p className="text-neutral-700 text-sm py-2">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur
                quo voluptate laboriosam quae quisquam. Tempore autem nihil non
                doloremque unde cum modi quod excepturi fuga. Corrupti
                laudantium qui accusamus pariatur.
              </p>
              <p className="text-sm">
                <span className="uppercase font-semibold">Category:</span>
                <span className="text-neutral-700"> {categoryName}</span>
              </p>
              <p className="text-sm">
                <span className="uppercase font-semibold">Sub-Category:</span>
                <span className="text-neutral-700"> {subCategory}</span>
              </p>
              <p className="text-sm">
                <span className="uppercase font-semibold my-2">Weight:</span>
                <span className="text-neutral-700"> {weight}</span>
              </p>
              <p className="my-2 flex font-semibold self-end ">
                <button
                  className="text-white bg-pink-700 px-3 py-1 rounded-lg flex items-center mx-1"
                  onClick={() =>
                    isItemInCart(_id) === -1
                      ? AddToCartHander(productToBeDisplayed)
                      : navigate('/cart')
                  }
                >
                  <span>
                    {isItemInCart(_id) === -1 ? 'Add to Cart' : 'Go to Cart'}
                  </span>
                  <span>
                    <AiOutlineShoppingCart />
                  </span>
                </button>
                <button
                  className="flex items-center border-pink-700 text-pink-700 border-2 rounded-lg  px-3 py-1 mx-1"
                  onClick={() => AddToWishlistHander(productToBeDisplayed)}
                >
                  <span>
                    {isItemInWishlist(_id) === -1
                      ? 'Add to Wishlist'
                      : 'Go to Wishlist'}
                  </span>
                  <span>
                    <AiOutlineHeart />
                  </span>
                </button>
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ProductDetail;
