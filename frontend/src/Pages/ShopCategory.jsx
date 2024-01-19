import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../Components/ShopContext/ShopContext";
import Item from "../Components/Item/Item";
import { Circles } from "react-loader-spinner";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

export const ShopCategory = (props) => {
  const { allProducts } = useContext(ShopContext);
  const { banner, category } = props;
  const [categorySpecificProducts, setCategorySpecificProducts] = useState([]);
  const [sortBySelection, setSortBySelection] = useState('title');
  useEffect(() => {

    if (allProducts.length > 0) {
      const filteredProducts = allProducts.filter((product) => {
        return product.category === category;
      });

      switch(sortBySelection)
      {
        case 'title':
          filteredProducts.sort((a,b)=>a.name.localeCompare(b.name));
          break;
        case 'priceDescending':
          filteredProducts.sort((a,b)=>b.new_price - a.new_price);
          break;
          case 'priceAscending':
            filteredProducts.sort((a,b)=>a.new_price - b.new_price);
            break;
          default:
      }
      setCategorySpecificProducts(filteredProducts);
    }
  }, [allProducts, category, setCategorySpecificProducts, sortBySelection]);

  if (!allProducts) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Circles
          height={80}
          width={80}
          color="#4fa94d"
          ariaLabel="circles-loading"
        />
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-3 bg-[conic-gradient(at_right,_var(--tw-gradient-stops))] from-gray-200 via-gray-100 to-gray-300">
      <img className="mx-3" src={banner} alt="banner" />
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <p className="ml-3">
            <span className="font-bold">
              Showing 1-{categorySpecificProducts.length}
            </span>{" "}
            out of {allProducts.length} Products
          </p>
          <div className="flex w-[25%] md:w-[20%] lg:w-[10%] mr-[2rem] gap-1">
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Sort By</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Sort By"
                value={sortBySelection}
                onChange={(e)=>setSortBySelection(e.target.value)}
              >
                <MenuItem value='title'>Title</MenuItem>
                <MenuItem value='priceDescending'>Price(High to Low)</MenuItem>
                <MenuItem value='priceAscending'>Price(Low to High)</MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:mx-3 gap-5 md:grid-cols-2 place-items-center lg:grid-cols-4">
          {categorySpecificProducts.map((item) => {
            return (
              <div key={item.productId}>
                <Item item={item} />
              </div>
            );
          })}
        </div>
      </div>
      <div className="border-2 w-fit mx-auto py-2 my-5 bg-gray-200 px-5 rounded-full">
        <p>Explore More</p>
      </div>
    </div>
  );
};
