import React from "react";
import Sidebar from "../../Components/Sidebar/Sidebar";
import { Route, Routes } from "react-router-dom";
import AddProduct from "../../Components/AddProduct/AddProduct";
import ListProduct from "../../Components/ListProduct/ListProduct";
import ProductDetails from "../../Components/ProductDetails/ProductDetails";

const Admin = () => {
  return (
    <div>
      <div className="flex flex-col lg:flex-row lg:justify-between gap-5">
        <Sidebar />
        <Routes>
          <Route path="/addProduct" element={<div className="md:mt-[2rem] w-full"><AddProduct /></div>} />
          <Route path="/listProduct" element={<div className="lg:w-full h-full flex justify-center"><div className="md:mt-[2rem] w-full lg:w-fit"><ListProduct /></div></div>} />
          <Route path="/editProduct/:productId" element = {<div className="md:mt-[2rem] w-full"><ProductDetails/></div>}/>
        </Routes>
        
      </div>
    </div>
  );
};

export default Admin;
