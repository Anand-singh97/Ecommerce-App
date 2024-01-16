import React, { useContext } from 'react'
import { ShopContext } from '../Components/ShopContext/ShopContext';
import { useParams } from 'react-router-dom';
import Breadcrumbs from '../Components/Breadcrumbs/Breadcrumbs';
import ProductDisplay from '../Components/ProductDisplay/ProductDisplay';
import RelatedProducts from '../Components/RelatedProducts/RelatedProducts';
import ProductDescription from '../Components/ProductDescription/ProductDescription';

export const Product = () => {
  const {allProducts} = useContext(ShopContext);
  const {productId} = useParams();
  const product = allProducts.find((e)=> e.productId === Number(productId));
  return (
    <div>
      <Breadcrumbs product = {product}/>
      <ProductDisplay product = {product}/>
      <ProductDescription/>
      <RelatedProducts/>
    </div>
  )
}
