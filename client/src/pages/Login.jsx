import axios from "axios";
import { useState } from "react";
import { setUserData } from "../Redux/slices/user-slice";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import 'react-toastify/dist/ReactToastify.css';

//const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;



const Login = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");

  const loginUser = async (e) => {
    e.preventDefault();

  if (!userEmail.trim() || !userPassword.trim()) {
    toast.error("Please enter both email and password.");
    return; 
  }

  try {
    const user = {
      userEmail,
      userPassword,
    };
      

      const result = await axios.post("http://localhost:6969/auth/login", user);
      if (result.data.status === "Error") {
        if (result.data.message === "User does not exist") {
          toast.error("User does not exist. Kindly sign up first.");
          navigate("/signup");
        } else if (result.data.message === "Wrong credentials") {
          toast.error("Incorrect email or password. Please try again.");
        }
      } else {
        toast.success("You have successfully logged in!");
        dispatch(setUserData(result.data));
        navigate("/"); 
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 404) {
          toast.error("User does not exist. Kindly sign up first.");
          navigate("/signup");
        } else if (error.response.status === 401) {
          toast.error("Incorrect email or password. Please try again.");
        } else {
          toast.error("An unexpected error occurred. Please try again later.");
        }
      } else {
        console.log("Cannot Login the User: ", error);
        toast.error("An unexpected error occurred. Please check your connection.");
      }
      <ToastContainer/>
    }
  };

  return (
    <div className="h-heightWithoutNavbar flex flex-col items-center justify-evenly p-5 lg:flex-row">

      <form className="h-ful items-center justify-center flex w-full max-w-[500px] flex-col gap-4 rounded-xl bg-white p-5 shadow-xl" onSubmit={loginUser}>
        <h1 className="text-2xl font-bold">Login</h1>
        <div className="flex flex-col gap-4 w-[90%]">
          <div className="flex flex-col items-start justify-center ">
            <label className="font-bold " htmlFor="userEmail">Email</label>
            <input
              type="email"
              id="userEmail"
              name="userEmail"
              className="w-full rounded-lg border border-gray-400 p-2 focus:ring focus:ring-blue-500"
              placeholder="your.email@example.com"
              onChange={(e) => setUserEmail(e.target.value)}
            />
          </div>
          <div className="flex flex-col items-start justify-center">
            <label className="font-bold" htmlFor="userPassword">Password</label>
            <input
              type="password"
              id="userPassword"
              name="userPassword"
              className="w-full rounded-lg border border-gray-400 p-2 focus:ring "
              placeholder="*********"
              onChange={(e) => setUserPassword(e.target.value)}
            />
          </div>
        </div>
        <button className="rounded-lg bg-[#4A4947] px-5 py-2 font-bold text-white hover:bg-[#B17457]" type="submit">
          Log In
        </button>
        <div className="flex items-center justify-between text-sm">
          <p className="">New to Learnio?</p>
          <Link to="/signup">
            <p className="font-bold">Create an account</p>
          </Link>
        </div>
        <div className="text-sm text-center mt-2">
          <Link to="/forgot-password" className="font-bold text-blue-500 hover:underline cursor-pointer">
            Forgot Password?
          </Link>
        </div>
      </form>
      <div className="grid place-content-center">
        <img
          src="./login.jpg"
          alt=""
          className="hidden sm:block md:w-[350px] lg:w-[500px] w-[200px] sm:w-[300px]"
        />
      </div>
    </div>
  );
};

export default Login;
