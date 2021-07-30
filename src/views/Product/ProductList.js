import React, { forwardRef, memo, createRef, useState, useCallback } from 'react'

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

// components
import ProductItem from './components/ProductItem';

const ProductList = forwardRef(({ initData }, ref) => {
  const dataList = initData ? initData : [null];
  const dataListRef = dataList.map(item => {
    const initRef = createRef();
    initRef.current = {};
    return {
      id: Date.now(),
      ref: initRef,
      initData: item
    }
  })
  // States
  const [data, setData] = useState(dataListRef)

  function addQuestion() {
    const addRef = createRef();
    addRef.current = {}
    setData(prevState => [
      ...prevState,
      {
        id: Date.now(),
        ref: addRef,
        initData: null
      }
    ])
  }

  const onRemoveItem = useCallback(index => {
    setData(prevState => {
      const newData = [...prevState];
      newData.splice(index, 1);
      return [...newData]
    })
  }, [])

  ref.current.getData = () => data.map(item => item.ref.current.getData());

  return (
    <>
      <h3 className="mt-3 mb-3">Advance</h3>
      
      {data.map((item, index) => (
       <ProductItem 
          key={index}
          index={index}
          ref={item.ref}
          initData={item.initData}
          onRemoveItem={onRemoveItem}
        />
      ))} 
      <br />
      <Grid container justify="flex-end">
        <Button color="primary" onClick={addQuestion}>Add More</Button>
      </Grid>

      
    </>
  )
})

export default memo(ProductList)
