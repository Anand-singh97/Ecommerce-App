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
    fetch("https://ecommercebackend-bp4d.onrender.com/product/allProducts", {
      method: "GET",
      credentials: "include",
    } ,[])
    .then((response)=> response.json())
    .then(({result})=>setAllProduct(result))
    .catch((error)=>{alert('Unexpected Error Ocurred, Please Try Again.')})

    if(localStorage.getItem('auth-token'))
    {
      const token = localStorage.getItem('auth-token');

      fetch('https://ecommercebackend-bp4d.onrender.com/user/getCartData', {
        method:'POST',
        credentials:'include',
        headers:{
          Accept:'application/json',
          'Content-Type':'application/json',
          'auth-token':`${token}`
        },
        body:''
      })
      .then((response)=>response.json())
      .then(({result})=>setCartItems(result))
      .catch((error)=>alert('Unexpected Error Ocurred, Please Try Again.'))
    }
  }, []);

  const addToCart = async (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    if(localStorage.getItem('auth-token'))
    {
      const token = localStorage.getItem('auth-token');
      const response = await fetch('https://ecommercebackend-bp4d.onrender.com/product/addToCart', {
        method:'POST',
        credentials:'include',
        body: JSON.stringify({'productId':itemId}),
        headers:{
          Accept:'application/json',
          'Content-Type':'application/json',
          'auth-token':`${token}`
        }
      })
      if(!response.ok)
      {
        alert('Server Error, Please try again.');
      }
    }
  };
  const removeFromCart = async (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    if(localStorage.getItem('auth-token'))
    {
      const token = localStorage.getItem('auth-token');
      const response = await fetch('https://ecommercebackend-bp4d.onrender.com/product/removeFromCart', {
        method:'POST',
        credentials:'include',
        body: JSON.stringify({'productId':itemId}),
        headers:{
          Accept:'application/json',
          'Content-Type':'application/json',
          'auth-token':`${token}`
        }
      })
      console.log(response);
    }
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
