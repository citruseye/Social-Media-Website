import React, {useState} from 'react';
import axios from "axios";
import {USER_API_END_POINT} from "../utils/constant";
import toast from 'react-hot-toast';
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import { getUser } from '../redux/userSlice';


const Login = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const submitHandler = async (e) => {
      e.preventDefault();
      if(isLogin){
        //login
        try {
          const res = await axios.post(`${USER_API_END_POINT}/login`, {email, password}, {
            headers: {
              'Content-Type': "application/json"
            },
            withCredentials: true
          });
          dispatch(getUser(res?.data?.user));
          if(res.data.success){
            navigate("/");
            toast.success(res.data.message);
          }
        } catch (error) {
          toast.success(error.response.data.message);
          console.log(error);
        }
      }else{
        //signup
        try {
          const res = await axios.post(`${USER_API_END_POINT}/register`, {username, email, password}, {
            headers: {
              'Content-Type': "application/json"
            },
            withCredentials: true
          });
          if(res.data.success){
            setIsLogin(true);
            toast.success(res.data.message);
          }
        } catch (error) {
          toast.success(error.response.data.message);
          console.log(error);
        }
      }
    }

    const loginSignupHandler = () => {
        setIsLogin(!isLogin);
    }

    return (
        <div className="flex flex-col justify-center items-center min-h-screen">
            <h1 className="text-3xl font-bold mb-6 text-blue-600">WeConnect</h1>
          <div className="w-full max-w-xs">
            <form onSubmit={submitHandler} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
              {
                !isLogin && (
                    <>
                    <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                  Username
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  type="text"
                  placeholder="Username"
                  
                />
              </div>
                    </>
                )
              }
              
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                  Email
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  placeholder="Email"
                  
                />
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                  Password
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  placeholder="********"
                  
                />
              </div>
              <div className="flex items-center justify-between">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  {isLogin ? "Login" : "Sign Up"}
                </button>
              </div>
              <h1>{isLogin ? "Do not have an account? " : "Already have an aaccount?"}<span onClick={loginSignupHandler} className='font-bold text-blue-600 cursor-pointer'>{isLogin ? "Create Account" : "Login"}</span></h1>
            </form>
          </div>
        </div>
      );
}

export default Login