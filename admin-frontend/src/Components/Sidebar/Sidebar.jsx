import React from "react";
import { Link } from "react-router-dom";
import add_product from "../assets/Product_Cart.svg";
import list_product from "../assets/Product_list_icon.svg";

const Sidebar = () => {
  return (
    <div className="flex flex-col md:flex-row gap-5 h-[100vh] md:h-fit md:w-[100%] md:justify-center w-fit bg-white px-[1rem] py-[2rem]">
      <div className=" bg-gray-100 p-5">
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
