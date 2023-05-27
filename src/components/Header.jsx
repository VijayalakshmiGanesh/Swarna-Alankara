import { useContext, useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { FiMenu } from 'react-icons/fi';
import { BiSearchAlt2 } from 'react-icons/bi';

import ProductContext from '../contexts/ProductContext';

function Header() {
  const [isClicked, setIsClicked] = useState(false);
  const { dispatch } = useContext(ProductContext);

  const [textToSearch, SetTextToSearch] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  const { pathname } = location;
  console.log(pathname);
  return (
    <header className="bg-blue-950 ">
      <div className="flex justify-between  items-center text-lg xl:max-w-7xl xl:mx-auto max-w-full px-[8%] flex-wrap w-full">
        <img
          src="./assests/logo1-removebg-preview.png"
          width="250"
          height="150"
          alt="Logo"
        />
        <FiMenu
          className="lg:hidden block h-6 w-6 cursor-pointer text-[#efa939]"
          onClick={() => setIsClicked(prev => !prev)}
        />
        <nav
          className={`{ ${
            isClicked ? 'block border-t mt-2' : 'hidden'
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
                  dispatch({ type: 'search', payload: textToSearch });

                  pathname !== '/products' && navigate('/products');
                }}
                className="rounded-lg px-2  py-1 h-full relative right-9 "
              >
                <BiSearchAlt2 />
              </button>
            </li>
            <li>
              <NavLink
                to="/"
                className="lg:px-5 py-2 block  hover:text-white font-semibold"
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/products"
                className="lg:px-5 py-2 block  hover:text-white font-semibold"
              >
                Products
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/cart"
                className="lg:px-5 py-2 block  hover:text-white font-semibold"
              >
                Cart
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/wishlist"
                className="lg:px-5 py-2 block  hover:text-white font-semibold"
              >
                WishList
              </NavLink>
            </li>
            <li>
              <NavLink
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
  );
}

export default Header;
