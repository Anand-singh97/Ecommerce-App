import React from 'react'
import Hero from '../Components/Hero/Hero'
import Popular from '../Components/Popular/Popular'
import Offers from '../Components/Offers/Offers'
import NewCollections from '../Components/NewCollections/NewCollections'
import NewsLetter from '../Components/NewsLetter/NewsLetter'
export const Shop = () => {
  return (
    <div className='bg-[conic-gradient(at_right,_var(--tw-gradient-stops))] from-gray-200 via-gray-100 to-gray-300'>
      <Hero/>
      <Popular/>
      <div className='my-[5rem]'><Offers/></div>
      <NewCollections/>
      <NewsLetter/>
    </div>
  )
}
