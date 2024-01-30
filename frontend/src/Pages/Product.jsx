import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../Components/ShopContext/ShopContext';
import { useParams } from 'react-router-dom';
import Breadcrumbs from '../Components/Breadcrumbs/Breadcrumbs';
import ProductDisplay from '../Components/ProductDisplay/ProductDisplay';
import ProductDescription from '../Components/ProductDescription/ProductDescription';
import RelatedProducts from '../Components/RelatedProducts/RelatedProducts';

export const Product = () => {
  const { allProducts } = useContext(ShopContext);
  const { productId } = useParams();
  const [specificProduct, setSpecificProduct] = useState(null);

  useEffect(() => {
    if (allProducts.length > 0) {
      const product = allProducts.find((e) => e.productId === Number(productId));
      setSpecificProduct(product);
    }
  }, [allProducts, productId])
  if (specificProduct === null) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );

  }
  return (
    <div>
      <Breadcrumbs product={specificProduct} />
      <ProductDisplay product={specificProduct} />
      <ProductDescription productId={specificProduct.productId} />
      <RelatedProducts />
    </div>
  )
}
