import { createContext, useEffect, useState } from "react";

export const ShopContext = createContext(null);

const getDefaultCart = () => {
  let cart = {};
  for (let i = 0; i < 301; i++) {
    cart[i] = 0;
  }
  return cart;
};

export const ShopContextProvider = (props) => {
  const [cartItems, setCartItems] = useState(getDefaultCart());
  const [allProducts, setAllProduct] = useState([]);
  const [activeCategory, setActiveCategory] = useState("");
  const categoryValue = { activeCategory, setActiveCategory };

  useEffect(() => {
    fetch("http://localhost:4000/product/allProducts", {
      method: "GET",
      credentials: "include",
    })
    .then((response)=> response.json())
    .then(({result})=>setAllProduct(result))
    .catch((error)=>{alert('Unexpected Error Ocurred, Please Try Again.')})
  }, []);

  const addToCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
  };
  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
  };
  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = allProducts.find(
          (product) => product.productId === Number(item)
        );
        totalAmount += itemInfo.new_price * cartItems[item];
      }
    }
    return totalAmount;
  };

  const getTotalCartItems = () => {
    let totalItems = 0;
    for (let i = 0; i < allProducts.length; i++) {
      if (cartItems[i] > 0) {
        totalItems += cartItems[i];
      }
    }
    return totalItems;
  };
  const contextValue = {
    allProducts,
    getTotalCartAmount,
    getTotalCartItems,
    cartItems,
    addToCart,
    removeFromCart,
    categoryValue
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};
