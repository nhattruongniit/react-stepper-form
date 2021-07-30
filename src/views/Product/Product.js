import React, { useRef } from 'react';

import ProductForm from './ProductForm';

function Product() {
  // Refs
  const productFormRefs = useRef({})

  function onSubmit(e) {
    e.preventDefault();
    console.log('ref', productFormRefs.current.getData())
  }
  
  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>Food</h1>
      <br />
      <h3 className="mb-3">Simple</h3>
      
      <ProductForm 
        ref={productFormRefs}
        onSubmit={onSubmit}
      />
    </div>
  )
}

export default Product
