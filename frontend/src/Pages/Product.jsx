import React, { useContext } from 'react'
import { ShopContext } from '../Components/ShopContext/ShopContext';
import { useParams } from 'react-router-dom';
import Breadcrums from '../Components/Breadcrums/Breadcrums';
import ProductDisplay from '../Components/ProductDisplay/ProductDisplay';
import Descriptionbox from '../Components/Descriptionbox/Descriptionbox';
import RelatedProducts from '../Components/RelatedProducts/RelatedProducts';
export const Product = () => {
  const {allProducts} = useContext(ShopContext);
  const {productId} = useParams();
  const product = allProducts.find((e)=> e.id === Number(productId));
  return (
    <div>
      <Breadcrums product = {product}/>
      <ProductDisplay product = {product}/>
      <Descriptionbox/>
      <RelatedProducts/>
    </div>
  )
}
