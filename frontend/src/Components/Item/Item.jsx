import React from "react";
import { Link } from "react-router-dom";
import { animateScroll as scroll } from 'react-scroll';

const Item = ({ item }) => {

  const { name, image, new_price, old_price, productId } = item;
  
  const scrollToTop = () => {
    scroll.scrollToTop({
      duration: 500, 
      smooth: 'easeInOutQuart',
    });
  };

  return (
    <Link to={`/product/${productId}`}>
      <div
      onClick={scrollToTop}
      className="flex gap-1 flex-col hover:scale-105 delay-[60ms] transition-all items-center"
    >
      <img className="w-[70%] lg:w-[100%]" src={image.url} alt="productImage" />
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
