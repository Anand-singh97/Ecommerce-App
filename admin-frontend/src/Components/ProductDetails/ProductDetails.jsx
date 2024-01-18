import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import upload_area from "../assets/upload_area.svg";
import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductDetails = () => {
  const [title, setTitle] = useState(null);
  const [price, setPrice] = useState(null);
  const [offerPrice, setOfferPrice] = useState(null);
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);
  const [newImage, setNewImage] = useState(null);
  const [errors, setErrors] = useState({});
  const { productId } = useParams();
  const [initialData, setInitialData] = useState({});
  const navigate = useNavigate();

  const imageHandler = (e) => {
    setNewImage(e.target.files[0]);
  };
  const formValidation = () => {
    const errorList = {};
    if (!title || !title.trim()) {
      errorList.title = "Title is required";
    }
    if (!price) {
      errorList.price = "Price is required";
    }
    if (!offerPrice) {
      errorList.offerPrice = "Offer Price is required";
    }
    if (!image) {
      errorList.image = "Image is required";
    }
    setErrors(errorList);
    return Object.keys(errorList).length === 0;
  };

  const isDataChanged = () => {
    return (
      initialData.title !== title ||
      initialData.price !== price ||
      initialData.offerPrice !== offerPrice ||
      initialData.category !== category || newImage !== null
    );
  };

  useEffect(() => {
    const getProductData = async () => {
      try {
        const response = await fetch(
          "https://ecommercebackend-bp4d.onrender.com/product/getSingleProduct",
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ productId: productId }),
          }
        );
        if (response.ok) {
          const { result } = await response.json();
          const { name, image, category, new_price, old_price } = result;
          setTitle(name);
          setPrice(old_price);
          setOfferPrice(new_price);
          setCategory(category);
          setImage(image.url);
          setInitialData({
            title: name,
            price: old_price,
            offerPrice: new_price,
            category: category,
            image: image.url,
          });
        }
      } catch (error) {
        alert("Server Error");
      }
    };
    getProductData();
  }, [productId]);

  const updateProduct = async (e) => {
    e.preventDefault();
    if (formValidation()) {
      if (isDataChanged()) 
      {
        const formData = new FormData();
        formData.append("productId", productId);
        formData.append("name", title);
        formData.append("category", category);
        formData.append("new_price", offerPrice);
        formData.append("old_price", price);

        const processingToast = toast.info("😊 Updating product. Please wait...", {
          autoClose: false
        });
  
        if(newImage)
        {
          formData.append("product", newImage);
        }
        try {
          const response = await fetch(
            "https://ecommercebackend-bp4d.onrender.com/product/updateProduct",
            {
              method: "POST",
              body: formData,
              credentials: "include",
            }
          );
          if (response.ok) 
          {
            toast.update(processingToast, {
              render: 'Product updated successfully.',
              type: toast.TYPE.SUCCESS,
              autoClose:3000
            })
            setTimeout(()=>{
              navigate('/listProduct');
            }, 1000)
          }
          else
          {
            toast.update(processingToast, {
              render: 'Error, updating product. Please try again.',
              type: toast.TYPE.ERROR,
              autoClose:3000
            })
          }
        } 
        catch (error) 
        {
          toast.update(processingToast, {
            render: 'Error, updating product. Please try again.',
            type: toast.TYPE.ERROR,
            autoClose:3000
          })
        }
      }
      else
      {
        toast.info('No changes have been made', {
          autoClose:2500
        })
      }
    }
  };

  return (
    <div className="h-full flex lg:justify-center">
      <form
        onSubmit={updateProduct}
        className="flex justify-center h-full lg:w-[75%] w-full"
      >
        <div className="flex flex-col w-full items-center gap-5 bg-white mx-5 rounded-lg py-[2rem] lg:px-[2rem] lg:h-full">
          <div>
            <h1 className=" text-[1.5rem] border-b-[1px] border-black font-[500] ">
              Update Product
            </h1>
          </div>
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
            <span className="block text-red-400">
              {errors.title ? errors.title : ""}
            </span>
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
                <span className="block text-red-400">
                  {errors.price ? errors.price : ""}
                </span>
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
                <span className="block text-red-400">
                  {errors.offerPrice ? errors.offerPrice : ""}
                </span>
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
              value={category}
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
                    src={newImage ? URL.createObjectURL(newImage) : image ? image : upload_area}
                    className="cursor-pointer lg:w-[30%] w-[90%]"
                    alt="upload area"
                    value = {newImage ? newImage : image}
                  />
                  <span className="text-red-400">
                    {errors.image ? errors.image : ""}
                  </span>
                </div>
              </label>
              <input type="file" onChange={imageHandler} id="file-input" hidden name="product" />
            </div>
          </div>

          <div className="flex gap-5">
            <button
              type="submit"
              className="flex bg-red-400 text-white py-2 px-[2rem] rounded-sm lg:self-start items-center"
            >
              UPDATE
            </button>
            <Link
              to={"/listProduct"}
              className="flex bg-red-400 text-white py-2 px-[2rem] rounded-sm lg:self-start items-center"
            >
              CANCEL
            </Link>
          </div>

          <ToastContainer
            position="top-right"
            hideProgressBar={true}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            transition={Slide}
          />
        </div>
      </form>
    </div>
  );
};

export default ProductDetails;
