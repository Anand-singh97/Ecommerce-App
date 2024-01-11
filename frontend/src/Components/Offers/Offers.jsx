import React from 'react'
import { Link } from 'react-router-dom'
import exclusiveImage from '../Assets/exclusive_image.png';
const Offers = () => {
  return (
    <div className='flex flex-col mx-3 md:mx-[3rem] pt-5 md:pt-0 bg-[conic-gradient(at_right,_var(--tw-gradient-stops))] from-rose-200 to-orange-100 lg:mx-[5rem] lg:px-[10rem] md:flex-row md:justify-between md:px-[2rem] items-center justify-center'>
        <div className='flex flex-col items-center'>
            <h1 className='text-[2rem] lg:text-[4rem] w-full font-bold'>Exclusive</h1>
            <h1 className='text-[2rem] lg:text-[4rem] font-bold'>Offers For You</h1>
            <p className='w-full font-bold'>ONLY ON BEST SELLERS</p>
            <Link className='bg-red-500 text-center w-full lg:mr-auto lg:w-[50%] text-white py-2 px-5 rounded-2xl'>Check Now</Link>
        </div>
        <div className='flex justify-center'>
            <img className='w-[80%] lg:w-[90%]' src={exclusiveImage} alt='exclusiveImage'/>
        </div>
    </div>
   
  )
}

export default Offers