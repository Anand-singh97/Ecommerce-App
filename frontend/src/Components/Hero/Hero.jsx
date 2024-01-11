import React from 'react'
import handIcon from '../Assets/hand_icon.png';
import arrowIcon from '../Assets/arrow.png';
import heroImage from '../Assets/hero_image.png';
import { Link } from "react-router-dom";
const Hero = () => {
  return (
    <div className='lg:flex-row bg-[conic-gradient(at_right,_var(--tw-gradient-stops))] from-rose-400 to-orange-300 lg:justify-around flex flex-col items-center justify-center'>
      <div className='mt-[5rem] lg:ml-[5rem] flex flex-col'>
        <h2 className=' font-bold'>NEW ARRIVALS ONLY</h2>
        <div className='flex flex-col'>
          <div className='flex items-center gap-4'>
            <p className=' text-[4rem] font-bold'>new</p>
            <img className='w-[15%]' src={handIcon} alt='handIcon'/>
          </div>
          <p className='text-[4rem] font-bold'>collections</p>
          <p className='text-[4rem] font-bold'>for Everyone</p>
        </div>
        <Link className='flex bg-red-500 text-white py-2 px-5 rounded-2xl gap-5 w-fit items-center'>
            Latest Collection
          <img src= {arrowIcon} alt=''></img>
        </Link>
      </div>
      <div className='w-fit flex justify-center'>
        <img className='w-[85%]' src={heroImage} alt='heroImage'/> 
      </div>
    </div>
  )
}

export default Hero
