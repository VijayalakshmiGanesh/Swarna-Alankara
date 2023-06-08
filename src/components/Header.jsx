import { useEffect, useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { FiMenu } from 'react-icons/fi';
import { BiSearchAlt2 } from 'react-icons/bi';
import { useDataContext } from '../contexts/DataContext';
import { IoCloseSharp } from 'react-icons/io5';

function Header() {
  const [isClicked, setIsClicked] = useState(false);
  const { filterdispatch } = useDataContext();
  const [textToSearch, SetTextToSearch] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  const { pathname } = location;
  const [isDiscountClosed, setIsDiscountClosed] = useState(true);
  const activeNavLink = ({ isActive }) => ({
    color: isActive && 'white',
  });

  useEffect(() => {
    setIsDiscountClosed(true);
  }, []);

  return (
    <>
      {isDiscountClosed && (
        <div className="bg-pink-700 text-white py-1 text-center flex items-center justify-center px-3">
          <span className="grow">
            Use coupon "NEO5" for 5% off on all order
          </span>
          <button onClick={() => setIsDiscountClosed(false)}>
            <IoCloseSharp className=" mr-auto border border-2 border-white p-1 text-2xl" />
          </button>
        </div>
      )}
      <header className="bg-blue-950 ">
        <div className="flex justify-between  items-center text-lg xl:max-w-7xl xl:mx-auto max-w-full px-[3%] md:px-[1%] flex-wrap w-full">
          <NavLink to="/">
            <img
              src="./assests/logo1-removebg-preview.png"
              width="250"
              height="150"
              alt="Logo"
            />
          </NavLink>
          <FiMenu
            className="lg:hidden block h-6 w-6 cursor-pointer text-[#efa939]"
            onClick={() => setIsClicked(prev => !prev)}
          />
          <nav
            className={`{ ${
              isClicked ? 'block mt-2' : 'hidden'
            } w-full  lg:w-auto lg:flex lg:items-center}`}
            id="nav-menu"
          >
            <ul className="text-[#efa939] lg:flex lg:justify-between lg:items-center text-left  ">
              <li className="flex items-center lg:justify-between">
                <input
                  type="text"
                  placeholder="Enter the product name"
                  onChange={e => SetTextToSearch(e.target.value)}
                  className="border-2 border-solid border-[#efa939] rounded-lg py-1 px-4 bg-blue-950"
                />
                <button
                  onClick={() => {
                    filterdispatch({ type: 'search', payload: textToSearch });

                    pathname !== '/products' && navigate('/products');
                  }}
                  className="rounded-lg px-2  py-1 h-full relative right-9 "
                >
                  <BiSearchAlt2 />
                </button>
              </li>
              <li>
                <NavLink
                  style={activeNavLink}
                  to="/"
                  className="lg:px-5 py-2 block  hover:text-white font-semibold"
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  style={activeNavLink}
                  to="/products"
                  className="lg:px-5 py-2 block  hover:text-white font-semibold"
                >
                  Products
                </NavLink>
              </li>
              <li>
                <NavLink
                  style={activeNavLink}
                  to="/cart"
                  className="lg:px-5 py-2 block  hover:text-white font-semibold"
                >
                  Cart
                </NavLink>
              </li>
              <li>
                <NavLink
                  style={activeNavLink}
                  to="/wishlist"
                  className="lg:px-5 py-2 block  hover:text-white font-semibold"
                >
                  WishList
                </NavLink>
              </li>
              <li>
                <NavLink
                  style={activeNavLink}
                  to="/user-profile"
                  className="lg:px-5 py-2 block hover:text-white font-semibold"
                >
                  Profile
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
}

export default Header;
