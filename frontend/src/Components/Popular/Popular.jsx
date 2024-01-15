import React, { useEffect, useState } from 'react'
import Item from '../Item/Item'
import { useContext } from 'react'
import { ShopContext } from '../ShopContext/ShopContext'


const Popular = () => {

  const {allProducts} = useContext(ShopContext);
  const[popularInWomen, setPopularInWomen] = useState([]);

  useEffect(()=>{
    const filteredArray = allProducts.filter((item)=>{
      return item.category === 'women';
    })
    setPopularInWomen(filteredArray.slice(-4));
  }, [allProducts])

  return (
    <div className='mb-[5rem]'>
        <div className='flex justify-center mb-4'>
            <h1 className='mb-1 text-xl font-bold border-b-[3px] border-black w-fit text-center mt-5'>POPULAR IN WOMEN</h1>
        </div>
        
        <div className='grid grid-cols-1 lg:mx-3 gap-5 md:grid-cols-2 place-items-center lg:grid-cols-4'>
            {popularInWomen.map((item)=>{
                return <Item key = {item.productId} item = {item}/>
            })}
        </div>
    </div>
  )
}

export default Popular