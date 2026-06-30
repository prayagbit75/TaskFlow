import { useState } from "react";
import { useEffect } from "react";
import { Link , useNavigate} from "react-router-dom";
import api from "../api/axios";
import { useDispatch } from "react-redux";
import {login } from '../features/authSlice.js'

function Login() {

      const navigate = useNavigate();
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

    };

    const formSubmit = async (e) => {

        e.preventDefault();

        try {

            const response = await api.post(
                "user/login",
                formData
            );
            console.log(response.data.data.user);

            dispatch( 
                login(response.data.data.user)
            );

            navigate("/dashboard");

        }
        catch (error) {

            console.log(error);

        }

    };



  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">

      {/* Background Glow */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-indigo-600/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-violet-600/20 rounded-full blur-3xl"></div>

      {/* Card */}
      <div className="relative z-10 w-full max-w-md bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl p-8">

        {/* Heading */}
        <h1 className="text-4xl font-bold text-center text-white">
          Welcome Back
        </h1>

        <p className="text-center text-slate-400 mt-2">
          Login to continue managing your tasks.
        </p>

        {/* Form */}
        <form className="mt-8 space-y-5" onSubmit={formSubmit} >

          {/* Email */}
          <div>
            <label className="block text-slate-300 mb-2">   
              Email
            </label>

            <input
              type="email"
              name="email"
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:border-indigo-500"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-slate-300 mb-2">
              Password
            </label>

            <input
              type="password"
              name="password"
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:border-indigo-500"
            />
          </div>

          {/* Forgot Password */}
          {/* <div className="text-right">
            <Link
              to="/forgot-password"
              className="text-sm text-indigo-400 hover:text-indigo-300"
            >
              Forgot Password?
            </Link>
          </div> */}

          {/* Login Button */}
          <button
          type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 transition rounded-xl py-3 text-white font-semibold"
          >
            Login
          </button>

        </form>

        {/* Footer */}
        <p className="text-center text-slate-400 mt-6">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-indigo-400 hover:text-indigo-300"
          >
            Sign Up
          </Link>
        </p>

      </div>

    </div>
  );
}

export default Login;