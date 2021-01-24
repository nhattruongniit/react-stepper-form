import React, { useState, useEffect } from 'react'

import TextField from '@material-ui/core/TextField';

function DefaultPage({ value, onChangeValue }) {
  const [inputValue, setInputValue] = useState(() => value);

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChangeValue(inputValue)
    }, 100)

    return () => {
      clearTimeout(timeout)
    }
  }, [inputValue])

  return (
    <div>
      <TextField 
        margin="normal" 
        fullWidth 
        id="name" 
        type="text" 
        label="Name" 
        variant="outlined" 
        defaultValue={value}
        onChange={e => setInputValue(e.target.value)}
      />
    </div>
  )
}

export default DefaultPage
