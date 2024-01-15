import React from 'react'
import Item from '../Item/Item';
import { useContext } from 'react';
import { ShopContext } from '../ShopContext/ShopContext';
const RelatedProducts = () => {

  const {allProducts} = useContext(ShopContext);
  const {categoryValue} = useContext(ShopContext);
  const {activeCategory} = categoryValue;
  return (
    <div className='mb-5'>
        <div className='flex justify-center mb-4'>
            <h1 className='mb-1 text-xl font-bold border-b-[3px] border-black w-fit text-center mt-5'>RELATED PRODUCTS</h1>
        </div>
        <div className='grid grid-cols-1 lg:mx-3 gap-5 md:grid-cols-2 place-items-center lg:grid-cols-4'>
            {allProducts
            .filter((item)=>item.category === activeCategory)
            .slice(-4)
            .map((item)=>{
                return <div key={item.productId}><Item item={item}/></div>
            })}
        </div>
    </div>
  )
}

export default RelatedProducts