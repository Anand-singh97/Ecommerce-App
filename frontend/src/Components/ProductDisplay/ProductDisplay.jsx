import React, { useContext } from "react";
import starIcon from "../Assets/star_icon.png";
import starDullIcon from "../Assets/star_dull_icon.png";
import { ShopContext } from "../ShopContext/ShopContext";
import { ToastContainer, toast, Slide } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const ProductDisplay = (item) => {
  const { product } = item;
  const { image, name, old_price, new_price, id } = product;
  const { addToCart } = useContext(ShopContext);

  const notify = () => toast("Item added to the cart 😊");

  return (
    <div className="flex flex-col gap-3 mb-5 lg:flex-row mx-3">
      <div className="gap-2 flex items-center justify-center">
        <div className="flex flex-col w-[7rem] gap-2">
          <img className="" src={image} alt="" />
          <img className="" src={image} alt="" />
          <img className="" src={image} alt="" />
          <img className="" src={image} alt="" />
        </div>
        <div className="w-[30rem]">
          <img src={image} className=" w-[100%]" alt="product img" />
        </div>
      </div>
      <div className="flex flex-col lg:mt-5 gap-5">
        <h1 className=" text-[2rem] font-bold">{name}</h1>
        <div className="flex gap-2 items-center">
          <img src={starIcon} alt="" />
          <img src={starIcon} alt="" />
          <img src={starIcon} alt="" />
          <img src={starIcon} alt="" />
          <img src={starDullIcon} alt="" />
          <p>(122)</p>
        </div>
        <div className="flex items-center gap-2 font-bold">
          <div className="line-through text-gray-400 text-2xl">
            ${old_price}
          </div>
          <div className=" text-red-500 text-3xl">${new_price}</div>
        </div>
        <div>
          Introducing our standout{" "}
          <span className=" text-orange-400">{name}</span>– a true embodiment of
          style and sophistication. Crafted with precision and attention to
          detail, this exquisite piece seamlessly combines fashion-forward
          design with unparalleled comfort.
        </div>
        <div>
          <h1 className=" font-bold">Select Size</h1>
          <div className="flex gap-3">
            <div className="border-2 px-3">S</div>
            <div className="border-2 px-3">M</div>
            <div className="border-2 px-3">L</div>
            <div className="border-2 px-3">XL</div>
            <div className="border-2 px-3">XXL</div>
          </div>
        </div>
        <div className="flex justify-center items-center gap-3 lg:justify-start">
          <button
            onClick={() => {
              addToCart(id);
              notify();
            }}
            className="flex bg-red-400 text-white py-2 px-[2rem] rounded-sm items-center"
          >
            ADD TO CART
          </button>
          <ToastContainer
            position="top-right"
            autoClose={1500}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            transition={Slide}
          />
        </div>
        <div>
          <p>
            <span className=" font-bold">Category : </span>Women, T-Shirt, Crop
            Top
          </p>
          <p>
            <span className=" font-bold">Tags : </span>Modern, Latest
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductDisplay;
