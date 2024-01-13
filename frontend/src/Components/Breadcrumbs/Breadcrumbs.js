import React from 'react'
import arrowIcon from '../Assets/breadcrum_arrow.png';
import { Link } from "react-router-dom";

const Breadcrumbs = (props) => {

    const {product} = props;
  return (
    <div className='flex items-center my-3 gap-2 mx-3'>
        <Link className='flex items-center gap-1' to={'/'}>SHOP <img src={arrowIcon} alt='arrow icon'/></Link>
        <Link className='flex items-center gap-1' to={`/${product.category}`}>{product.category} <img src={arrowIcon} alt='arrow icon'/></Link>
        <p className='flex cursor-pointer items-center gap-1 text-red-400' to={''}>{product.name}</p>
    </div>
  )
}

export default Breadcrumbs;