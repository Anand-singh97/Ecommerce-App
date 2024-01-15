import React, { useContext } from 'react'
import { ShopContext } from '../Components/ShopContext/ShopContext';
import { useParams } from 'react-router-dom';
import Breadcrumbs from '../Components/Breadcrumbs/Breadcrumbs';
import ProductDisplay from '../Components/ProductDisplay/ProductDisplay';
import DescriptionBox from '../Components/DescriptionBox/DescriptionBox';
import RelatedProducts from '../Components/RelatedProducts/RelatedProducts';

export const Product = () => {
  const {allProducts} = useContext(ShopContext);
  const {productId} = useParams();
  const product = allProducts.find((e)=> e.productId === Number(productId));
  return (
    <div>
      <Breadcrumbs product = {product}/>
      <ProductDisplay product = {product}/>
      <DescriptionBox/>
      <RelatedProducts/>
    </div>
  )
}
