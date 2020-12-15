import React from 'react';

import TextField from '@material-ui/core/TextField';


function Account() {
  return (
    <>
      <TextField margin="normal" fullWidth id="outlined-basic" label="Email Address" variant="outlined" />
      <TextField margin="normal" fullWidth id="outlined-basic" label="Username" variant="outlined" />
      <TextField margin="normal" fullWidth id="outlined-basic" label="Password" variant="outlined" />
    </>
  )
}

export default Account
