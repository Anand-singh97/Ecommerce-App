import React, { useState } from "react";
import logo from "../Assets/logo.png";
import cart_icon from "../Assets/cart_icon.png";
import { Link } from "react-router-dom";

function Navbar() {

    const [underline, setUnderline] = useState({});

    const displayUnderline = (elementName)=>
    {
        setUnderline({[elementName]: 'border-red-500 translate-y-[-0.2rem] border-b-[2.1px]'});
    }

  return (
    <div className="flex mx-2 items-center justify-between gap-[3rem] border-b-2 pb-1">
      <div className="flex justify-center items-center">
        <Link to={"/"}>
          <img className="" src={logo} alt="app logo" />
        </Link>
      </div>

      <div>
        <ul className="flex text-[1rem] items-center gap-3">

          <li onClick={() =>displayUnderline('shop')} className= {underline.shop ? underline.shop : ''}>
            <Link to={"/shop"}>Shop</Link>
          </li>
          <li onClick={() =>displayUnderline('men')} className= {underline.men ? underline.men : ''}>
            <Link to={"/men"}>Men</Link>
          </li>
          <li onClick={() => displayUnderline('women')} className= {underline.women ? underline.women : ''}>
            <Link to={"/women"}>Women</Link>
          </li>
          <li onClick={() =>displayUnderline('kids')} className= {underline.kids ? underline.kids : ''}>
          <Link to={"/kids"}>Kids</Link>
          </li>
        </ul>
      </div>

      <div className=" relative flex justify-c enter gap-3 items-center">
        <Link className="border-2 py-1 px-5 rounded-lg" to={'/login'}>Login</Link>
        <div>
            <img className="absolute rounded-xl top-[5rem] right-6 p-2 w-[50%]" src={cart_icon} alt="cart_icon" />
            <div className="absolute flex justify-center items-center top-[5.1rem] text-white right-[1.2rem] rounded-full h-[1.2rem] w-[1.2rem] bg-red-400">
                <p className="text-[1rem] ">1</p>
            </div>
            

        </div>
        
      </div>
    </div>
  );
}

export default Navbar;
