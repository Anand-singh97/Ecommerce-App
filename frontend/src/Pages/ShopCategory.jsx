import React, { useContext } from "react";
import { ShopContext } from "../Components/ShopContext/ShopContext";
import dropDownIcon from "../Components/Assets/dropdown_icon.png";
import Item from "../Components/Item/Item";

export const ShopCategory = (props) => {
  const { allProducts } = useContext(ShopContext);
  const { banner, category } = props;
  return (
    <div className="flex flex-col gap-3">
      <img className="mx-3" src={banner} alt="banner" />
      <div className="flex flex-col gap-4">
        <div className="flex justify-between">
          <p className="ml-3">
            <span className=" font-bold">Showing 1-12</span> out of 36 Products
          </p>
          <div className="flex mr-3 border-2 rounded-full py-1 px-4 items-center gap-1">
            <p>Sort by</p>
            <div>
              <img alt="drop down icon" src={dropDownIcon} />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:mx-3 gap-5 md:grid-cols-2 place-items-center lg:grid-cols-4">
          {allProducts.map((item) => {
            if (category === item.category) {
              return (
                <div key={item.id}>
                  <Item item={item} />
                </div>
              );
            }
            return null;
          })}
        </div>
      </div>
      <div className="border-2 w-fit mx-auto py-2 my-5 bg-gray-200 px-5 rounded-full">
        <p>Explore More</p>
      </div>
    </div>
  );
};
