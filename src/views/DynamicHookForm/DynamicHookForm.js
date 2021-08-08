import React, { useState, Fragment } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

// material 
import FormHelperText from '@material-ui/core/FormHelperText';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

// initData
import { initData } from './initData';

const fakeRequest = data => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(data)
    }, 500)
  })
}

const schema = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  location: yup.array().of(
    yup.object().shape({
      address: yup.string().required(),
      district: yup.string().required(),
      city: yup.string().required()
    })
  )
})

const defaultLocation = {
  address: '',
  district: '',
  city: ''
}

const defaultForms = {
  firstName: '',
  lastName: '',
  location: [defaultLocation]
}

export default function DynamicHookForm() {
  const [forms, setForms] = useState(defaultForms)
  const { handleSubmit, control, reset, setValue, formState: { errors }} = useForm({
    resolver: yupResolver(schema),
    defaultValues: forms
  });

  function handleAddMore() {
    setForms(prevState => {
      return {
        ...prevState,
        location: [...prevState.location, defaultLocation]
      }
    })
  }

  const onSubmit = data =>  {
    alert('SUCCESS!! :-)\n\n' + JSON.stringify(data, null, 4))
    setForms(defaultForms)
    reset()
  };

  async function loadDataExists() {
    const res = await fakeRequest(initData);
    const fields = ['firstName', 'lastName', 'location'];
    console.log('res: ', res)
    // setForms(res)
    fields.forEach(field => setValue(field, res[field]))
    setForms(res)
  }

  console.log('forms: ', forms)

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>React Dynamic Form with React Hook Form</h1>
      <Grid container item xs={12}>
        <Button type="submit" color="primary" variant="contained" onClick={loadDataExists}>
          Load Data Exists
        </Button>
      </Grid>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          <Grid item xs={12}><h3>Simple</h3></Grid>
          <Grid item xs={6}>
            <Controller 
              name="firstName"
              control={control}
              render={({ field }) => (
                <TextField 
                  fullWidth
                  id="firstName"
                  name="firstName" 
                  label="First Name" 
                  variant="outlined" 
                  error={errors.firstName ? true : false}
                  helperText={errors.firstName && 'please enter input'}
                  {...field}
                />
              )}
            />
          </Grid>
          <Grid item xs={6}>
            <Controller 
              name="lastName"
              control={control}
              render={({ field }) => (
                <TextField 
                  fullWidth
                  id="lastName"
                  name="lastName" 
                  label="Last Name" 
                  variant="outlined" 
                  error={errors.lastName ? true : false}
                  helperText={errors.lastName && 'please enter input'}
                  {...field}
                />
              )}
            />
          </Grid>
          <Grid item xs={12}><h3>Advance</h3></Grid>
          {forms.location.map((_, index) => {
            return (
              <Fragment key={`location-${index}`}>
                <Grid item xs={4}>
                  <Controller 
                    name={`location[${index}].address`}
                    control={control}
                    render={({ field }) => (
                      <TextField 
                        fullWidth
                        id="address"
                        name="address" 
                        label="Address" 
                        variant="outlined" 
                        error={errors?.location?.[index]?.address ? true : false}
                        helperText={errors?.location?.[index]?.address && 'please enter input'}
                        {...field}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={4}>
                  <Controller 
                    name={`location[${index}].district`}
                    control={control}
                    render={({ field }) => (
                      <FormControl 
                        variant="outlined" 
                        fullWidth 
                        error={errors?.location?.[index]?.district ? true : false}
                      >
                        <InputLabel id="input-ward">District</InputLabel>
                        <Select
                          label="District"
                          fullWidth
                          defaultValue={`location[${index}].district`}
                          {...field}
                        >
                          <MenuItem value="" disabled />
                          <MenuItem value="phunhuan">Phu Nhuan</MenuItem>
                          <MenuItem value="binhthanh">Binh Thanh</MenuItem>
                          <MenuItem value="govap">Go Vap</MenuItem>
                        </Select>
                        {errors?.location?.[index]?.district && <FormHelperText>Please choose ward</FormHelperText>}
                      </FormControl>
                    )}
                  />
                </Grid>
                <Grid item xs={4}>
                  <Controller 
                    name={`location[${index}].city`}
                    control={control}
                    render={({ field }) => (
                      <FormControl 
                        variant="outlined" 
                        fullWidth 
                        error={errors?.location?.[index]?.city ? true : false}
                      >
                        <InputLabel id="input-city">City</InputLabel>
                        <Select
                          id="city"
                          label="City"
                          fullWidth
                          defaultValue={`location[${index}].city`}
                          {...field}
                        >
                          <MenuItem value="" disabled />
                          <MenuItem value="hcm">TP.HCM</MenuItem>
                          <MenuItem value="hanoi">Ha Noi</MenuItem>
                          <MenuItem value="phuquoc">Phu Quoc</MenuItem>
                        </Select>
                        {errors?.location?.[index]?.city && <FormHelperText>Please choose city</FormHelperText>}
                      </FormControl>
                    )}
                  />
                </Grid>
              </Fragment>
            )
          })}
         
          <Grid container item xs={12} justify="flex-end">
            <Button color="primary" onClick={handleAddMore}>Add More</Button>
          </Grid>
          <Grid container item xs={12} md={12} justify="flex-end">
            <Button type="submit" color="primary" variant="contained">
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
      
    </div>
  )
}
