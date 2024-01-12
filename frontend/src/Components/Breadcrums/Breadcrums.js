import React from 'react'
import arrowIcon from '../Assets/breadcrum_arrow.png';

const Breadcrums = (props) => {

    const {product} = props;
  return (
    <div className='flex items-center my-3 gap-3 mx-3'>
        HOME <img src={arrowIcon} alt='arrow icon'/>
        SHOP <img src={arrowIcon} alt='arrow icon'/>
        {product.category} <img src={arrowIcon} alt='arrow icon'/>
        {product.name}
    </div>
  )
}

export default Breadcrums