import React from 'react'
import { Link } from 'react-router-dom'

const NewsLetter = () => {
  return (
    <div className='flex mb-5 flex-col mx-3 md:mx-[3rem] py-5 bg-[conic-gradient(at_right,_var(--tw-gradient-stops))] from-rose-200 to-orange-100 lg:mx-[5rem] lg:px-[10rem] md:px-[2rem] items-center gap-3 justify-center'>
        <h1 className=' text-[1.4rem] md:text-[2rem] font-bold text-center'>Get Exclusive Offers On Your Email</h1>
        <p className='text-center'>Subscribe to our news letter and stay updated</p>
        <div className='border-2 h-[3rem] border-gray-100 flex justify-between rounded-full'>
            <input className='bg-transparent pl-5 rounded-full focus:outline-none' type='email' placeholder='Your Email id'/>
            <Link className=' text-white bg-black rounded-full flex items-center px-2 justify-center h-full w-[50%] text-center'>SUBSCRIBE</Link>
        </div>
    </div>
  )
}

export default NewsLetter