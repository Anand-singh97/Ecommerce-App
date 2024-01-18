import React, { useContext, useState } from "react";
import logo from "../Assets/logo.png";
import { Link, Outlet } from "react-router-dom";
import { ShopContext } from "../ShopContext/ShopContext";
import { MdShoppingCart } from "react-icons/md";

function Navbar() {
  const [underline, setUnderline] = useState({
    shop: "border-red-500 translate-y-[-0.2rem] border-b-[2.1px]",
  });
  const { getTotalCartItems } = useContext(ShopContext);
  const displayUnderline = (elementName) => {
    setUnderline({
      [elementName]: "border-red-500 translate-y-[-0.2rem] border-b-[2.1px]",
    });
  };

  const logout = () => {
    localStorage.removeItem("auth-token");
    window.location.replace('/');
  };

  return (
    <>
      <div className="flex py-3 mx-2 items-center justify-between gap-[3rem] border-b-2">
        <div className="flex md:ml-[2rem] justify-center items-center">
          <Link to={"/"}>
            <img
              className=""
              onClick={() =>
                setUnderline({
                  shop: "border-red-500 translate-y-[-0.2rem] border-b-[2.1px]",
                })
              }
              src={logo}
              alt="app logo"
            />
          </Link>
        </div>

        <div>
          <ul className="flex text-[1rem] lg:gap-[2rem] items-center gap-3">
            <li className={underline.shop ? underline.shop : ""}>
              <Link onClick={() => displayUnderline("shop")} to={"/"}>
                Shop
              </Link>
            </li>
            <li className={underline.men ? underline.men : ""}>
              <Link onClick={() => displayUnderline("men")} to={"/men"}>
                Men
              </Link>
            </li>
            <li className={underline.women ? underline.women : ""}>
              <Link onClick={() => displayUnderline("women")} to={"/women"}>
                Women
              </Link>
            </li>
            <li className={underline.kids ? underline.kids : ""}>
              <Link onClick={() => displayUnderline("kids")} to={"/kid"}>
                Kids
              </Link>
            </li>
          </ul>
        </div>

        <div className="flex justify-center md:mr-[2rem] gap-5 items-center mr-2">
          <div className="relative">
            <Link to={"/cart"}>
              <MdShoppingCart className="scale-[2]" />
            </Link>
            <div className="absolute flex justify-center items-center top-[-1rem] text-white right-[-1rem] rounded-full h-[1.1rem] w-[1.1rem] bg-red-400">
              <p className="text-[1rem] ">{getTotalCartItems()}</p>
            </div>
          </div>
          {localStorage.getItem("auth-token") ? (
            <Link onClick={logout} className="border-2 bg-orange-300 py-1 px-5 rounded-lg">
              Logout
            </Link>
          ) : (
            <Link className="border-2 py-1 bg-orange-300 px-5 rounded-lg" to={"/login"}>
              Login
            </Link>
          )}
          <Link className="border-2 bg-orange-300 py-1 px-5 rounded-lg">Admin Panel</Link>
        </div>
      </div>
      <div>
        <Outlet />
      </div>
    </>
  );
}

export default Navbar;
