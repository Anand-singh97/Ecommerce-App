import React from "react";
import { Link } from "react-router-dom";
import add_product from "../assets/Product_Cart.svg";
import list_product from "../assets/Product_list_icon.svg";

const Sidebar = () => {
  return (
    <div className="flex lg:flex-col flex-row gap-5 lg:w-[25%] lg:h-[100vh] h-fit justify-center bg-white px-[1rem] py-[2rem]">
      <div className="bg-gray-100 p-5">
        <Link className="flex items-center gap-5" to={"/addProduct"}>
          <img src={add_product} alt="add product icon" />
          <p>Add Product</p>
        </Link>
      </div>

      <div className="bg-gray-100 p-5">
        <Link className="flex items-center gap-5" to={"/listProduct"}>
          <img src={list_product} alt="add product icon" />
          <p>Product List</p>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
