import { useContext, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { NavLink } from 'react-router-dom';
import { BiShow, BiHide } from 'react-icons/bi';

function Login() {
  const [emailEntered, setEmailEntered] = useState('');
  const [passwordEntered, setPasswordEntered] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { LoginHandler, hasErrorOccured } = useContext(AuthContext);

  const TestCredshandler = () => {
    setEmailEntered('adarshbalika@gmail.com');
    setPasswordEntered('adarshbalika');
  };
  return (
    <>
      <div className="relative flex justify-center items-center  ">
        {/* <div className='w-[400px] h-[400px] p-5 bg-white shadow-lg h-full flex flex-col items-center border-1 border-solid border-slate-700'> */}
        <div className=" my-16 py-5 px-7 drop-shadow-lg w-[370px] border-2 border-solid border-gray-50 shadow-lg">
          <p className="text-2xl font-semibold text-center">Login</p>
          <p className="text-gray-400 text-xs">
            Please login using account detail below
          </p>
          <div className="my-5 max-w-xs">
            {hasErrorOccured && (
              <p className="px-3 py-1 bg-red-300 text-red-800 rounded border-solid border-red-800 w-full">
                Incorrect login Credentials. Please try again.{' '}
              </p>
            )}
            <label className="flex flex-col my-5 w-full">
              <span className="text-xs text-left">Enter email</span>
              <input
                type="email"
                placeholder="Enter email"
                className="text-left w-full border-gray-500 px-4 py-3 border-[1px] border-solid border-stone-300 "
                onChange={e => setEmailEntered(e.target.value)}
                value={emailEntered}
              />
            </label>
            <label className="flex flex-col mb-5">
              <span className="text-xs text-left">Enter password</span>
              <div className="relative flex items-center ">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter password"
                  className=" text-left w-full border-gray-500 px-4 py-3 focus-visible:border-gray-800"
                  onChange={e => setPasswordEntered(e.target.value)}
                  value={passwordEntered}
                />
                <button
                  className="absolute right-0 p-2 text-lg"
                  onClick={() => setShowPassword(prev => !prev)}
                >
                  {showPassword ? <BiHide /> : <BiShow className="" />}
                </button>
              </div>
            </label>
            <div className="flex mb-5 ">
              <button
                className="w-full text-white bg-pink-700 mx-1 p-3 rounded-md font-bold"
                onClick={() => LoginHandler(emailEntered, passwordEntered)}
              >
                Sign in
              </button>
              <button
                className="w-full  text-white bg-pink-700 mx-1 p-3 rounded-md font-bold"
                onClick={() => TestCredshandler()}
              >
                Test Credentials
              </button>
            </div>
            <NavLink to="/signup" className="text-pink-700 mx-1 p-3 font-bold ">
              Don't have an account? Sign Up &gt;
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
