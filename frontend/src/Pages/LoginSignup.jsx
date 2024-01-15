import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ToastContainer, toast, Slide } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export const LoginSignup = () => {

  const [state, setState] = useState('Login');
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [errors, setErrors] = useState({});

  function validation()
  {
    const errorList = {};

    if((!name || !name.trim()) && state !== 'Login')
    {
      errorList.name = 'Name is required';
    }
    if(!email || !email.trim())
    {
      errorList.email = 'Email is required'
    } 
    if(!password || !password.trim())
    {
      errorList.password = 'Password is required'
    }
    return Object.keys(errorList).length === 0;
  }
  const login = async()=>
  {
    if(validation())
    {
      const processingToast = toast.info("😊 Processing request. Please wait...", {
        autoClose: false
      });
      console.log(email, password);
      const response = await fetch('http://localhost:4000/user/login', {
        method: 'POST',
        body: JSON.stringify({email:email, password:password}),
        credentials:'include',
        headers:{
          Accept:'application/json',
          'Content-Type':'application/json'
        }
      })
      if(response.ok)
      { 
        const {name} = await response.json();
        toast.update(processingToast, {
          render:`Welcome ${name}`,
          type:toast.TYPE.SUCCESS,
          autoClose:3000
        })
      }
      else
      {
        toast.update(processingToast, {
          render:`Invalid Credentials`,
          type:toast.TYPE.ERROR,
          autoClose:3000
        })
      }
    }
  }
  const signUp = ()=>
  {
    if(validation)
    {

    }
  }

  return (
    <div className='flex bg-pink-100 justify-center items-center h-[60vh]'>
      <div className='w-[430px] lg:w-[600px] bg-white p-6'>
        <h1 className='text-2xl font-bold mb-4 text-center'>{state}</h1>
        <div className='flex flex-col gap-2 items-center'>
          {state !== 'Login' ? <input type='text' onChange={(e)=> setName(e.target.value)} placeholder='Your name' className='mb-2 focus:outline-none border-2 p-2' />
          :
          <></>}
          <input type='email' onChange={(e)=> setEmail(e.target.value)} placeholder='Email Address' className='mb-2 focus:outline-none border-2 p-2' />
          <input type='password' onChange={(e)=> setPassword(e.target.value)} placeholder='Password' className='mb-4 focus:outline-none border-2 p-2' />
        </div>
        <div className='flex mb-3 justify-center'>
          <Link onClick={()=> {state === 'Login' ? login() : signUp()}} className='flex bg-red-400 text-white py-2 px-[2rem] rounded-sm items-center'>Continue</Link>
        </div>
        {
          state !== 'Login' ? <p className='mt-2 text-[0.9rem] flex justify-center'>Already have an account?&nbsp;<Link onClick={()=> setState('Login')} className=' text-red-500 font-semibold' to="/login">Login Here</Link></p>
          :
          <p className='mt-2 text-[0.9rem] flex justify-center'>Create an Account?&nbsp;<Link onClick={()=> setState('Sign Up')} className='text-red-500 font-semibold' to="/login">Click Here</Link></p>
        }
        <ToastContainer
            position="top-right"
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            transition={Slide}
          />
        
      </div>
    </div>
  )
}
