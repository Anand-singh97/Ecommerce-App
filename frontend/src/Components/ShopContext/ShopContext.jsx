import { createContext, useState } from "react";
import allProducts from '../Assets/all_product';

export const ShopContext = createContext(null); 

const getDefaultCart = ()=>{
    let cart = {};
    for(let i = 0; i < allProducts.length + 1; i++)
    {
        cart[i] = 0;
    }
    return cart;
}

export const ShopContextProvider = (props)=>{
    
    const [cartItems, setCartItems] = useState(getDefaultCart());

    const addToCart = (itemId)=>{
        setCartItems((prev)=>({...prev, [itemId]:prev[itemId]+1}));
    }
    const removeFromCart = (itemId)=>{
        setCartItems((prev)=>({...prev, [itemId]:prev[itemId]-1}));
    }
    const getTotalCartAmount = ()=>{
        let totalAmount = 0;
        for(const item in cartItems)
        {
            if(cartItems[item] > 0){
                let itemInfo = allProducts.find((product)=> product.id === Number(item));
                totalAmount += itemInfo.new_price * cartItems[item];
            }
        }
        return totalAmount;
    }

    const getTotalCartItems = ()=>{
        let totalItems = 0;
        for(let i = 0 ; i < allProducts.length; i++)
        {
            if(cartItems[i] > 0)
            {
                totalItems += cartItems[i];
            }
        }
        return totalItems;
    }
    const contextValue = {allProducts, getTotalCartAmount, getTotalCartItems, cartItems, addToCart, removeFromCart};

    return ( 
        <ShopContext.Provider value={contextValue}>{props.children}</ShopContext.Provider>
    );
}