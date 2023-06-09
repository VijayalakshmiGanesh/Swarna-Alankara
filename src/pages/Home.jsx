import { useEffect } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useDataContext } from '../contexts/DataContext';
import { getCategoriesFromAPI } from '../services/category';

function Home() {
  const { datadispatch, category, filterdispatch, SetTextToSearch } =
    useDataContext();
  const location = useLocation();
  const navigate = useNavigate();
  const HandleCategory = (filterType, valueToSend) => {
    filterdispatch({ type: filterType, payload: valueToSend });
    navigate('/products', {
      state: { from: location.pathname },
    });
  };

  useEffect(() => {
    filterdispatch({ type: 'reset' });
    getCategoriesFromAPI(datadispatch);
    SetTextToSearch('');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <section>
        <div className="relative">
          <div className="h-[88vh] bg-gray-200 ">
            <img
              src="https://images.pexels.com/photos/6387623/pexels-photo-6387623.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              className="h-full object-cover w-full blur-[1px]"
              alt="hero banner"
            />
          </div>
          <div className="absolute flex h-full w-full top-0 left-0 flex-col align-center">
            <p className="my-auto w-full justify-center text-indigo-50 text-5xl z-50 banner-text">
              Exquisite Gold and Silver for Every Occasion
              <br />
              <NavLink
                to="/products"
                className="py-3 px-5 rounded-2xl bg-blue-950 text-xl mt-7 "
              >
                Shop Now &gt;
              </NavLink>
            </p>
          </div>
        </div>
      </section>
      <div className="my-5  pb-7">
        <p className="text-2xl my-5 ">SHOP BY CATEGORY</p>
        <div className="flex flex-col items-center justify-center md:flex-row">
          {category?.map(categoryItem => {
            const { _id, categoryName, description, imageUrl } = categoryItem;

            return (
              <div
                className="relative hover:cursor-pointer self-center mx-3"
                key={_id}
                onClick={() => HandleCategory('categoryFilter', categoryName)}
              >
                <img
                  src={imageUrl}
                  alt={`${categoryName} section`}
                  className="w-full md:w-[33vw] h-[300px]  object-cover"
                />
                <p className="bg-black/[0.6] absolute bottom-0 text-center w-full md:w-[33vw]  py-3 text-white font-semibold text-2xl  banner-text">
                  {description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Home;
