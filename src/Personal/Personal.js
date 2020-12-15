import React from 'react';

import TextField from '@material-ui/core/TextField';
import { Grid } from '@material-ui/core';


function Personal() {
  return (
    <>
      <TextField margin="normal" fullWidth id="outlined-basic" label="First Name" variant="outlined" />
      <TextField margin="normal" fullWidth id="outlined-basic" label="Last Name" variant="outlined" />
      <TextField margin="normal" fullWidth id="outlined-basic" label="Address" variant="outlined" />
      <Grid container>
        <Grid items xs={9} spacing={2}>
          <TextField margin="normal" fullWidth id="outlined-basic" label="Phone" variant="outlined" />
        </Grid>
        <Grid items xs={3} spacing={2}>
          <TextField margin="normal" fullWidth id="outlined-basic" label="Phone" variant="outlined" />
        </Grid>
      </Grid>
    </>
  )
}

export default Personal
