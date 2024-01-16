import React, { useEffect, useState } from 'react'
import Item from '../Item/Item';
const NewCollections = () => {

  const [newCollection, setNewCollection] = useState([]);

  useEffect(()=>{
    const getNewCollection = async()=>{

      const response = await fetch('http://localhost:4000/product/newProducts', {
        method:'GET',
        credentials:'include'
      })
      if(response.ok)
      {
        const {result} = await response.json();
        setNewCollection(result);
      }
    } 
    getNewCollection();
  }, [])

  return (
    <div className='mb-[5rem]'>
        <div className='flex justify-center mb-4'>
            <h1 className='mb-1 text-xl font-bold border-b-[3px] border-black w-fit text-center mt-5'>NEW COLLECTIONS</h1>
        </div>
        <div className='grid grid-cols-1 lg:mx-3 gap-5 md:grid-cols-2 place-items-center lg:grid-cols-4'>
            {newCollection.map((items)=>{
                return <Item item={items}/>
            })}
        </div>
    </div>
  )
}

export default NewCollections