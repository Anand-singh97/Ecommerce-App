import { createContext } from "react";
import allProducts from '../Assets/all_product';
export const ShopContext = createContext(null); 

export const ShopContextProvider = (props)=>{
    const contextValue = {allProducts};
    return ( 
        <ShopContext.Provider value={contextValue}>{props.children}</ShopContext.Provider>
    );
}