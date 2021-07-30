import React, { forwardRef, memo, useState, useRef } from 'react';
import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';

import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

// atomics
import AutoCompleteSimple from 'components/AutoCompleteSimple';

// components
import ProductList from './ProductList';

// data
import { optionsProduct } from 'data';

const ProductForm = forwardRef(({ onSubmit }, ref) =>  {
  // States
  const [products, setProducts] = useState({})

  // Refs
  const categoryRef = useRef({})
  const productListRef = useRef({})

  ref.current.getData = () => ({
    ...products,
    category: categoryRef.current.value,
    productList: productListRef.current.getData()
  })

  function handleChange(e) {
    const {name, value } = e.target;
    setProducts(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  return (
    <>
      <form onSubmit={onSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <TextField 
              fullWidth
              size="small"
              id="name"
              name="name" 
              label="Name" 
              variant="outlined" 
              defaultValue={products.name || ''}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <AutoCompleteSimple 
              size="small"
              label="Category"
              defaultValue={products?.category || optionsProduct[0]}
              options={optionsProduct}
              inputRef={categoryRef}
              getOptionLabel={(option) => option.name}
              renderOption={(option, { inputValue }) => {
                const matches = match(option.name, inputValue);
                const parts = parse(option.name, matches);
                return (
                  <div>
                    {parts.map((part, index) => (
                      <span key={index} style={{ fontWeight: part.highlight ? 700 : 400 }}>
                        {part.text}
                      </span>
                    ))}
                  </div>
                );
              }}
            />
          </Grid>
        </Grid>

        <ProductList 
          ref={productListRef}
          initData={products.subProducts || null}
        />

        <Button variant="contained" color="primary" type="submit">
          Submit
        </Button>
      </form>
    </>
    
  )
})

export default memo(ProductForm)
