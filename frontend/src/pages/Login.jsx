/*import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { BASE_URL } from "../api";


const Login = () => {

  const { backendUrl, token, setToken } = useContext(AppContext)
  const navigate = useNavigate()
  const [state, setState] = useState('Sign Up')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onSubmitHandler = async (e) => {
    e.preventDefault()

    try {

      if (state === 'Sign up') {
        const { data } = await axios.post(backendUrl + '/api/user/register', { name, password, email })
        if (data.success) {
          localStorage.setItem('token', data.token)
          setToken(data.token)
        } else {
          toast.error(data.message)
        }
      } else {
        const { data } = await axios.post(backendUrl + '/api/user/login', { email, password })
        if (data.success) {
          localStorage.setItem('token', data.token)
          setToken(data.token)
        } else {
          toast.error(data.message)
        }
      }

    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if (token) {
      navigate('/')
    }
  }, [token])

  return (
    <form onSubmit={onSubmitHandler} className='min-h-[80vh] flex items-center'>
      <div className='flex flex-col gap-3 m-auto items-start p-8 min-w min-w-[340px] sm:min-w-96 border rounded-xl text-zinc-600 text-sm shadow-lg'>
        <p className='text-2xl font-semibold'>{state === 'Sign Up' ? 'Create Account' : 'Login'}</p>
        <p>Please {state === 'Sign Up' ? 'sign up' : 'log in'} to book appointment</p>

        {
          state === 'Sign Up' && (
            <div className='w-full'>
              <p>Full Name</p>
              <input className='border border-zinc-300 rounded w-full p-2 mt-1' type="text" onChange={(e) => setName(e.target.value)} value={name} required />
            </div>
          )
        }

        <div className='w-full'>
          <p>Email</p>
          <input className='border border-zinc-300 rounded w-full p-2 mt-1' type="email" onChange={(e) => setEmail(e.target.value)} value={email} required />
        </div>

        <div className='w-full'>
          <p>Password</p>
          <input className='border border-zinc-300 rounded w-full p-2 mt-1' type="password" onChange={(e) => setPassword(e.target.value)} value={password} required />
        </div>

        <button type='submit' className='bg-primary text-white w-full py-2 rounded-md text-base'>{state === 'Sign Up' ? 'Create Account' : 'Login'}</button>

        {
          state === 'Sign Up'
            ? <p>Already have an account? <span onClick={() => setState('Login')} className='text-primary underline cursor-pointer'>Login here</span></p>
            : <p>Create an new accout? <span onClick={() => setState('Sign Up')} className='text-primary underline cursor-pointer'>click here</span></p>
        }
      </div>
    </form>
  )
}

export default <Login></Login>*/

import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const BASE_URL = "http://localhost:4000";

const Login = () => {
  const { token, setToken } = useContext(AppContext);
  const navigate = useNavigate();

  const [state, setState] = useState("Login"); // Default: Login form
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const resetFields = () => {
    setName("");
    setEmail("");
    setPassword("");
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      if (state === "Sign Up") {
        // Register user
        const { data } = await axios.post(`${BASE_URL}/api/user/register`, {
          name,
          email,
          password,
        });

        if (data.success) {
          toast.success("Account created successfully!");
          localStorage.setItem("token", data.token);
          setToken(data.token);
          navigate("/");
        } else {
          toast.error(data.message || "Signup failed");
        }
      } else {
        // Login user
        const { data } = await axios.post(`${BASE_URL}/api/user/login`, {
          email,
          password,
        });

        if (data.success) {
          toast.success("Login successful!");
          localStorage.setItem("token", data.token);
          setToken(data.token);
          navigate("/");
        } else {
          toast.error(data.message || "Login failed");
        }
      }
    } catch (error) {
      if (!error.response) {
        toast.error("Network error: Cannot connect to backend (port 4000)");
      } else {
        toast.error(error.response.data.message || "Something went wrong");
      }
    }
  };

  // ✅ Only navigate if the token exists AND user is not already on this page
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken && !token) {
      setToken(savedToken);
      navigate("/"); // Redirect only if logged in
    }
  }, [token, setToken, navigate]);

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gray-100">
      <form
        onSubmit={onSubmitHandler}
        className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-zinc-600 text-sm shadow-lg bg-white"
      >
        <p className="text-2xl font-semibold mb-1">
          {state === "Sign Up" ? "Create Account" : "Login"}
        </p>
        <p className="text-gray-500 mb-3">
          Please {state === "Sign Up" ? "sign up" : "log in"} to continue.
        </p>

        {state === "Sign Up" && (
          <div className="w-full">
            <p>Full Name</p>
            <input
              className="border border-zinc-300 rounded w-full p-2 mt-1"
              type="text"
              onChange={(e) => setName(e.target.value)}
              value={name}
              placeholder="Enter your full name"
              required
            />
          </div>
        )}

        <div className="w-full">
          <p>Email</p>
          <input
            className="border border-zinc-300 rounded w-full p-2 mt-1"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="Enter your email"
            required
          />
        </div>

        <div className="w-full">
          <p>Password</p>
          <input
            className="border border-zinc-300 rounded w-full p-2 mt-1"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="Enter your password"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white w-full py-2 rounded-md text-base mt-3 hover:bg-blue-700 transition-all"
        >
          {state === "Sign Up" ? "Create Account" : "Login"}
        </button>

        {/* --- THIS SECTION Toggles the view between Login and Sign Up --- */}
        {state === "Sign Up" ? (
          <p className="mt-2 text-sm text-center w-full">
            Already have an account?{" "}
            <span
              onClick={() => {
                setState("Login");
                resetFields();
              }}
              className="text-blue-600 underline cursor-pointer"
            >
              Login here
            </span>
          </p>
        ) : (
          <p className="mt-2 text-sm text-center w-full">
            Don’t have an account?{" "}
            <span
              onClick={() => {
                setState("Sign Up");
                resetFields();
              }}
              className="text-blue-600 underline cursor-pointer"
            >
              Create Account
            </span>
          </p>
        )}
      </form>
    </div>
  );
};

export default Login;
