import React, { forwardRef, memo, useRef } from 'react'
import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';

import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';

import CloseIcon from '@material-ui/icons/Close';

// atomics
import AutoCompleteGroup from 'components/AutoCompleteGroup';

// data
import { dataFoods } from 'data';

const ProductItem = forwardRef(({ index, initData, onRemoveItem }, ref) => {
  // Refs
  const subNameRef = useRef();
  const categoryRef = useRef({})
  const priceRef = useRef({})

  ref.current.getData = () => ({
    order: index,
    subName: subNameRef.current.value,
    category: categoryRef.current.value,
    price: Number(priceRef.current.value)
  });

  return (
    <>  
      <Grid container spacing={3}>
        <Grid container item spacing={3} xs={11}>
          <Grid item xs={4}>
            <TextField 
              fullWidth
              size="small"
              id="sub-name"
              name="subName" 
              label="Sub Name" 
              variant="outlined" 
              inputRef={subNameRef}
              defaultValue={initData ? initData.subName : ''}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField 
              fullWidth
              size="small"
              id="price"
              type="number"
              name="price" 
              label="Price" 
              variant="outlined" 
              inputRef={priceRef}
              defaultValue={initData ? initData.price : 0}
            />
          </Grid>
          <Grid item xs={4}>
            <AutoCompleteGroup 
              size="small"
              label="Category"
              defaultValue={initData ? initData.category : undefined}
              options={dataFoods}
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
        <Grid item xs={1}>
          {index !== 0 && (
            <IconButton 
              aria-label="remove"  
              color="secondary"
              onClick={() => onRemoveItem(index)}
            >
              <CloseIcon />
            </IconButton>
          )}
        </Grid>
      </Grid>

      
    </>
  )
})

export default memo(ProductItem)
