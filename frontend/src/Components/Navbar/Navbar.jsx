import React, { useContext } from "react";
import logo from "../Assets/logo.png";
import { Link, Outlet } from "react-router-dom";
import { ShopContext } from "../ShopContext/ShopContext";
import profilePic from "../Assets/profilePic.webp";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
function Navbar() {
  const { getTotalCartItems } = useContext(ShopContext);

  const logout = () => {
    localStorage.removeItem("auth-token");
    window.location.replace("/");
  };

  return (
    <div>
      <nav class="bg-gray-800 w-full">
        <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div class="relative flex h-16 items-center justify-between">
            <div class="flex items-center justify-center sm:items-stretch sm:justify-start">
              <div class="justify-start">
                <Link to={"/"} >
                  <img className="w-[70%]" src={logo} alt="shopping logo" />
                </Link>
              </div>
              <div className="hidden sm:ml-6 sm:block">
                <div className="flex space-x-4">
                  <Link
                    to={"/"}
                    className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                    aria-current="page"
                  >
                    Shop
                  </Link>
                  <Link
                    to={"/men"}
                    className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                    aria-current="page"
                  >
                    Men
                  </Link>
                  <Link
                    to={"/women"}
                    className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                  >
                    Women
                  </Link>
                  <Link
                    to={"/kid"}
                    className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                  >
                    Kid
                  </Link>
                </div>
              </div>
            </div>
            <div class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              <div class="flex ml-3 items-center gap-5 mr-2">
                {localStorage.getItem("auth-token") ? (
                  <Link
                    onClick={logout}
                    className="text-gray-300 border-[1px] hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                  >
                    Logout
                  </Link>
                ) : (
                  <Link
                    to={"/login"}
                    className="text-gray-300 border-[1px] hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                  >
                    Login
                  </Link>
                )}
                <div>
                  <Link
                    to={
                      localStorage.getItem("auth-token") ? "/profile" : "/login"
                    }
                    className=""
                    id="user-menu-button"
                    aria-expanded="false"
                    aria-haspopup="true"
                  >
                    <img class="h-8 w-8 rounded-full" src={profilePic} alt="" />
                  </Link>
                </div>
                <div className="relative">
                  <Link to={"/cart"}>
                    <ShoppingCartIcon className="scale-[1.4] text-white" />
                  </Link>
                  <div className="absolute flex justify-center items-center top-[-0.5rem] text-white right-[-0.6rem] rounded-full h-[1.1rem] w-[1.1rem] bg-red-400">
                    <p className="text-[0.8rem]">{getTotalCartItems()}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="sm:hidden" id="mobile-menu">
          <div class="flex justify-center items-center gap-3 px-2 pb-3 pt-2">
            <Link
              to={"/"}
              class="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
            >
              Shop
            </Link>
            <Link
              to={"/men"}
              class="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
            >
              Men
            </Link>
            <Link
              to={"/women"}
              class="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
            >
              Women
            </Link>
            <Link
              to={"/kid"}
              class="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
            >
              Kid
            </Link>
          </div>
        </div>
      </nav>
      <Outlet />
    </div>
  );
}

export default Navbar;
