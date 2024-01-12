import React from 'react'
import { Link } from 'react-router-dom'

export const LoginSignup = () => {
  return (
    <div className='flex bg-pink-100 justify-center items-center h-[60vh]'>
      <div className='w-[430px] lg:w-[600px] bg-white p-6'>
        <h1 className='text-2xl font-bold mb-4 text-center'>Sign Up</h1>
        <div className='flex flex-col gap-2 items-center'>
          <input type='text' placeholder='Your name' className='mb-2 focus:outline-none border-2 p-2' />
          <input type='email' placeholder='Email Address' className='mb-2 focus:outline-none border-2 p-2' />
          <input type='password' placeholder='Password' className='mb-4 focus:outline-none border-2 p-2' />
        </div>
        <div className='flex justify-center'>
          <Link className='flex bg-red-400 text-white py-2 px-[2rem] rounded-sm items-center' to="/">Continue</Link>
        </div>
        <p className='mt-2 text-[0.9rem]'>Already have an account? <Link className=' text-red-500 font-semibold' to="/login">Login Here</Link></p>
        <div className='flex items-center justify-center'>
          <input type='checkbox' name='' id='' className='mr-2' />
          <p className='text-[0.9rem]'>By continuing, I agree to the terms of use & privacy policy.</p>
        </div>
      </div>
    </div>
  )
}
