import React, { useContext } from "react";
import { ShopContext } from "../ShopContext/ShopContext";
import { CiCircleRemove } from "react-icons/ci";
import emptyCart from "../Assets/emptyCart.png";
const CartItems = () => {
  const { allProducts, cartItems, removeFromCart, getTotalCartAmount } = useContext(ShopContext);

  // Filter products with quantity greater than 0
  const cartItemsToRender = allProducts.filter(
    (item) => cartItems[item.productId] > 0
  );

  return (
    <div className="my-[1rem] mb-[3rem] md:my-[3.5rem]">
      <div className="flex justify-center mb-4">
        <h1 className="mb-1 text-2xl font-bold border-b-[3px] border-black w-fit text-center mt-5">
          CART ITEMS
        </h1>
      </div>

      <div className="mx-3">
        <div className="flex flex-col gap-3">
          {cartItemsToRender.length === 0 ? (
            <div className="flex justify-center">
              <img src={emptyCart} alt="empty cart" />
            </div>
          ) : (
            <div className="mb-4">
              <table className="table-auto w-full mb-5">
                <thead className="border-b-[1px]">
                  <tr>
                    <th className="table-cell px-4 py-2 text-center">
                      Products
                    </th>
                    <th className="hidden md:table-cell px-4 py-2 text-center">
                      Title
                    </th>
                    <th className="px-4 py-2 text-center">Price</th>
                    <th className="px-4 py-2 text-center">Quantity</th>
                    <th className="px-4 py-2 text-center">Total price</th>
                    <th className="px-4 py-2 text-center">Remove</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItemsToRender.map((item) => (
                    <tr key={item.id} className="">
                      <td className="table-cell px-4 border-b-[1px] py-2">
                        <img
                          className="w-[3rem] md:w-[5rem] mx-auto"
                          alt="item img"
                          src={item.image.url}
                        />
                      </td>
                      <td className="hidden md:table-cell px-4 border-b-[1px] text-center w-fit py-2">
                        {item.name}
                      </td>
                      <td className="px-4 border-b-[1px] text-center py-2">
                        ${item.new_price}
                      </td>
                      <td className="px-4 border-b-[1px] text-center py-2">
                        {cartItems[item.productId]}
                      </td>
                      <td className="px-4 border-b-[1px] text-center py-2">
                        ${item.new_price * cartItems[item.productId]}
                      </td>
                      <td className="px-4 border-b-[1px] cursor-pointer py-2">
                        <CiCircleRemove
                          onClick={() => removeFromCart(item.productId)}
                          className="scale-[1.5] mx-auto"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="flex flex-col md:items-center md:justify-between md:flex-row gap-[2rem]">
                <div className="flex md:ml-[2rem] flex-col gap-3">
                  <div>
                    <h1 className="mb-1 text-2xl font-bold border-b-[3px] border-black w-fit text-center mt-5">
                      Cart Totals
                    </h1>
                  </div>
                  <div className="flex justify-between border-b-[2px]">
                    <h3>Subtotal</h3>
                    <p>${getTotalCartAmount()}</p>
                  </div>
                  <div className="flex justify-between border-b-[2px]">
                    <h3>Shipping Fee</h3>
                    <p>FREE</p>
                  </div>
                  <div className="flex justify-between border-b-[2px]">
                    <h3 className="font-bold">Total</h3>
                    <p className="font-bold">${getTotalCartAmount()}</p>
                  </div>
                  <button className="flex w-fit bg-red-400 text-white py-2 px-[2rem] rounded-sm items-center">
                    PROCEED TO CHECKOUT
                  </button>
                </div>
                <div className="md:mr-[2rem]">
                  <div className="flex flex-col gap-2">
                    <p>If you have a promo code, Enter it here</p>
                    <div className="flex">
                      <input
                        type="text"
                        placeholder="promo code"
                        className=" border-[1px] p-3 w-[80%] bg-gray-200"
                      />
                      <button className="flex w-fit bg-black text-white py-2 px-[2rem] rounded-sm items-center">
                        SUBMIT
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartItems;
