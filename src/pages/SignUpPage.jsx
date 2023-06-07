import { useContext, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { NavLink } from 'react-router-dom';
import { BiShow, BiHide } from 'react-icons/bi';

function SignUp() {
  const [emailEntered, setEmailEntered] = useState('');
  const [passwordEntered, setPasswordEntered] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const { SignUpHander } = useContext(AuthContext);

  return (
    <>
      <div className="flex justify-center items-center flex-col ">
        <div className=" my-16 py-5 px-7 drop-shadow-lg w-[370px] border-2 border-solid border-gray-50 shadow-lg">
          <p className="text-2xl font-semibold">Sign Up</p>
          <p className="text-gray-400 text-xs">
            Please signup by entering the details below
          </p>

          <div className="my-5 max-w-xs">
            <div className="flex flex-row">
              <label className="flex flex-col">
                <span className="text-xs text-left">Enter Firstname</span>
                <input
                  type="text"
                  placeholder="Adarsh"
                  className="text-left w-full border-gray-500 px-4 py-3"
                  onChange={e => setFirstName(e.target.value)}
                />
              </label>
              <label className="flex flex-col">
                <span className="text-xs text-left">Enter Lastname</span>
                <input
                  type="text"
                  placeholder="Balika"
                  className=" mx-1 text-left w-full border-gray-500 px-4 py-3"
                  onChange={e => setLastName(e.target.value)}
                />
              </label>
            </div>
            <label className="flex flex-col my-5">
              <span className="text-xs text-left">Enter Email</span>
              <input
                type="email"
                placeholder="test@gmail.com"
                className=" text-left w-full border-gray-500 px-4 py-3"
                onChange={e => setEmailEntered(e.target.value)}
              />
            </label>
            <label className="flex flex-col my-5 my-5 ">
              <span className="text-xs text-left">Enter Password</span>
              <div className="relative flex items-center">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="********"
                  className="text-left w-full border-gray-500 px-4 py-3 focus-visible:border-gray-800"
                  onChange={e => setPasswordEntered(e.target.value)}
                />
                <button
                  className="absolute right-0 p-2 text-lg"
                  onClick={() => setShowPassword(prev => !prev)}
                >
                  {showPassword ? <BiHide /> : <BiShow className="" />}
                </button>
              </div>
            </label>

            <button
              className="mb-5 text-white bg-pink-700 mx-1 p-3 rounded-md w-full font-bold"
              onClick={() =>
                SignUpHander(emailEntered, passwordEntered, firstName, lastName)
              }
            >
              Create account
            </button>
            <NavLink to="/login" className="text-pink-700 mx-1 p-3 font-bold ">
              Already have an account &gt;
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignUp;
