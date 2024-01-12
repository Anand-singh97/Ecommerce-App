import React from "react";
import { Link } from "react-router-dom";

const Item = ({ item }) => {
  const { name, image, new_price, old_price, id } = item;
  return (
    <Link to={`/product/${id}`}>
      <div className="flex gap-1 flex-col hover:scale-105 delay-[60ms] transition-all items-center">
        <img className="w-[70%] lg:w-[100%]" src={image} alt="productImage" />
        <div className="flex flex-col items-center">
          <p className="w-[70%] lg:w-[100%]">{name}</p>
        </div>
        <div className="flex gap-5 w-[70%] lg:w-[100%] font-semibold">
          <p>${new_price}</p>
          <p className=" text-gray-500 line-through">${old_price}</p>
        </div>
      </div>
    </Link>
  );
};

export default Item;
