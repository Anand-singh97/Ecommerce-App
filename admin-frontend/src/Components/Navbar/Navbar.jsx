import React from 'react'
import navLogo from '../assets/nav-logo.svg';
import navProfile from '../assets/nav-profile.svg';
import { Outlet } from 'react-router-dom';
const Navbar = () => {
  return (
    <div className=''> 
        <div className='flex bg-white items-center justify-between border-b-[1px] py-5'>
            <img className='ml-[2rem] w-[40%] md:w-[20%] lg:w-[15%]' src={navLogo} alt='nav logo'/>
            <img className='mr-[2rem]' src={navProfile} alt='nav profile'/>
        </div> 
        <Outlet/>  
    </div>
  )
}

export default Navbar;