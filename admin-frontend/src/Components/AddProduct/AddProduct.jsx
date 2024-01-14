import React, { useState } from "react";
import upload_area from "../assets/upload_area.svg";

const AddProduct = () => {
  const [title, setTitle] = useState(null);
  const [price, setPrice] = useState(null);
  const [offerPrice, setOfferPrice] = useState(null);
  const [category, setCategory] = useState("women");
  const [image, setImage] = useState(null);
  const [errors, setErrors] = useState({});

  const imageHandler = (e) => {
    setImage(e.target.files[0]);
  };

  const formValidation = () => {
    const errorList = {};
    if(!title || !title.trim())
    {
        errorList.title = 'Title is required';
    }
    if(!price || !price.trim())
    {
        errorList.price = 'Price is required';
    }
    if(!offerPrice || !offerPrice.trim())
    {
        errorList.offerPrice = 'Offer Price is required';
    }
    if(!image)
    {
        errorList.image = 'Image is required';
    }
    setErrors(errorList);
    return Object.keys(errorList).length === 0;
  };

  const addProduct = async (e) => {
    e.preventDefault();

    if (formValidation()) 
    {
      const formData = new FormData();
      formData.append('name', title);
      formData.append('category', category);
      formData.append('new_price', offerPrice);
      formData.append('old_price', price);
      formData.append('product', image);

      const response = await fetch("http://localhost:4000/product/addProduct", {
        method: "POST",
        credentials: "include",
        body:formData,
      });
      if(response.ok)
      {
        alert('Done');
      }else
      {
        console.log(response);
        alert('error');
      }
    }
  };

  return (
    <div className="h-full flex lg:justify-center">
      <form
        onSubmit={addProduct}
        className="flex justify-center h-full lg:w-[75%] w-full"
      >
        <div className="flex flex-col w-full items-center gap-5 bg-white mx-5 rounded-lg py-[2rem] lg:px-[2rem] lg:h-full">
          <div className="lg:w-full">
            <p className="text-gray-600 font-[500]">Product title</p>
            <input
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              className="p-3 lg:w-full border-[1px] border-gray-300 rounded-md focus:outline-none"
              type="text"
              name="name"
              placeholder="Type here"
              value={title}
            />
            <span className="block text-red-400">{errors.title ? errors.title : ''}</span>
          </div>
          <div className="lg:w-full flex">
            <div className="flex flex-col lg:flex-row gap-3">
              <div>
                <p className=" text-gray-600 font-[500]">Price</p>
                <input
                  onChange={(e) => {
                    setPrice(e.target.value);
                  }}
                  className="p-3 lg:w-full md:w-[90%] border-[1px] border-gray-300 rounded-md focus:outline-none"
                  type="text"
                  name="old_price"
                  placeholder="Type here"
                  value={price}
                />
                <span className="block text-red-400">{errors.price ? errors.price : ''}</span>
              </div>
              <div>
                <p className=" text-gray-600 font-[500]">Offer Price</p>
                <input
                  onChange={(e) => {
                    setOfferPrice(e.target.value);
                  }}
                  className="p-3 border-[1px] lg:w-full md:w-[90%] border-gray-300 rounded-md focus:outline-none"
                  type="text"
                  name="new_price"
                  placeholder="Type here"
                  value={offerPrice}
                />
                <span className="block text-red-400">{errors.offerPrice ? errors.offerPrice : ''}</span>
              </div>
            </div>
          </div>

          <div className="flex lg:w-full flex-col">
            <p className=" text-gray-600 font-[500]">Product Category</p>
            <select
              onChange={(e) => {
                setCategory(e.target.value);
              }}
              name="category"
              className="p-3 lg:w-fit border-[1px] cursor-pointer border-gray-300 rounded-md focus:outline-none bg-white"
            >
              <option value="women">Women</option>
              <option value="men">Men</option>
              <option value="kid">Kids</option>
            </select>
          </div>
          <div className="lg:w-full">
            <div className="">
              <label className="" htmlFor="file-input">
                <div className="flex flex-col justify-center items-center lg:items-start">
                  <img
                    src={image ? URL.createObjectURL(image) : upload_area}
                    className="cursor-pointer lg:w-[30%] w-[90%]"
                    alt="upload area"
                  />
                  <span className="text-red-400">{errors.image ? errors.image : ''}</span>
                </div>
              </label>
              <input
                type="file"
                id="file-input"
                onChange={imageHandler}
                hidden
                name="product"
              />
            </div>
          </div>

          <button
            type="submit"
            className="flex bg-red-400 text-white py-2 px-[2rem] rounded-sm lg:self-start items-center"
          >
            ADD
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
