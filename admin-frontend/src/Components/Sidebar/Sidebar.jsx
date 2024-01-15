import React, { useState } from "react";
import { Link } from "react-router-dom";
import add_product from "../assets/Product_Cart.svg";
import list_product from "../assets/Product_list_icon.svg";

const Sidebar = () => {

    const [selection, setSelection] = useState({add:'p-5 bg-gray-300'});

  return (
    <div className="flex lg:flex-col flex-row gap-5 lg:w-[25%] lg:h-[100vh] h-fit lg:justify-start justify-center bg-white px-[1rem] py-[2rem]">
      <Link to={"/addProduct"} onClick={()=>setSelection({add:'p-5 bg-gray-300'})} className = {selection.add ? selection.add : 'bg-gray-100 p-5'}>
        <div  className="flex items-center gap-5" >
          <img src={add_product}  alt="add product icon" />
          <p>Add Product</p>
        </div>
      </Link>

      <Link to={"/listProduct"} onClick={()=>setSelection({list:'p-5 bg-gray-300'})} className = {selection.list ? selection.list : 'bg-gray-100 p-5'}>
        <div  className="flex items-center gap-5">
          <img src={list_product}  alt="add product icon" />
          <p>Product List</p>
        </div>
      </Link>
    </div>
  );
};

export default Sidebar;
