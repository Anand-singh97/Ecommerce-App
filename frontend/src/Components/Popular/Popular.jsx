import React from 'react'
import dataProduct from '../Assets/data'
import Item from '../Item/Item'
const Popular = () => {
  return (
    <div>
        <div className='flex justify-center mb-4'>
            <h1 className='mb-1 text-xl font-bold border-b-[3px] border-black w-fit text-center mt-5'>POPULAR IN WOMEN</h1>
        </div>
        
        <div className='grid grid-cols-1 lg:mx-3 gap-5 md:grid-cols-2 place-items-center lg:grid-cols-4'>
            {dataProduct.map((item)=>{
                return <Item key = {item.id} item = {item}/>
            })}
        </div>
    </div>
  )
}

export default Popular