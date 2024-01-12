import React, { useContext } from "react";
import { ShopContext } from "../ShopContext/ShopContext";
import removeIcon from "../Assets/cart_cross_icon.png";
const CartItems = () => {
  const { allProducts, cartItems, removeFromCart } = useContext(ShopContext);
  return (
    <div>
      <div>
        <p>Products</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <hr />
      {allProducts.map((item) => {
        if (cartItems[item.id] > 0) {
          return (
            <div key={item.id}>
              <div>
                <img src={item.image} className="" alt="" />
                <p>{item.name}</p>
                <p>${item.new_price}</p>
                <button>{cartItems[item.id]}</button>
                <p>${item.new_price * cartItems[item.id]}</p>
                <img src={removeIcon} onClick={() => removeFromCart(item.id)} alt="" />
              </div>
            </div>
          );
        }
        return null;
      })}
    </div>
  );
};

export default CartItems;
