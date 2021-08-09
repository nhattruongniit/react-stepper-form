import React, { Fragment, useRef } from 'react';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
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
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

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

export default function DynamicHookForm() {
  const isRemoveFirstAddress = useRef(true);
  const { handleSubmit, control, reset, setValue, formState: { errors }} = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      firstName: '',
      lastName: '',
      location: [defaultLocation]
    }
  });
  const { fields, append, remove } = useFieldArray(
    {
      control,
      name: 'location',
    }
  )

  function handleAddMore() {
    append(defaultLocation)
  }

  const onSubmit = data =>  {
    console.log('SUCCESS!! :-)\n\n', data )
    // reset()
  };

  async function loadDataExists() {
    const res = await fakeRequest(initData);
    const fieldsDefault = ['firstName', 'lastName'];

    fieldsDefault.forEach(field => setValue(field, res[field]))
    res.location.forEach(field => {
      const newObj = {
        address:  field.address,
        district: field.district,
        city: field.city
      }
      append(newObj)
    })
    setTimeout(() => {
      if(!isRemoveFirstAddress.current) return;
      isRemoveFirstAddress.current = false;
      remove(0);
    }, 0)
  }

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
         
          {fields.map((item, index) => {
            return (
              <Fragment key={item.id}>
                <Grid container item spacing={3} xs={11}>
                  <Grid item xs={4}>
                    <Controller 
                      name={`location[${index}].address`}
                      control={control}
                      render={({ field }) => (
                        <TextField 
                          fullWidth
                          id="address"
                          label="Address" 
                          variant="outlined" 
                          error={errors?.location?.[index]?.address ? true : false}
                          helperText={errors?.location?.[index]?.address && 'please enter input'}
                          defaultValue={item.address}
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
                            defaultValue={item.district}
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
                            defaultValue={item.city}
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
                </Grid>
                <Grid item xs={1}>
                  {index !== 0 && (
                    <IconButton 
                      aria-label="remove"  
                      color="secondary"
                      onClick={() => remove(index)}
                    >
                      <CloseIcon />
                    </IconButton>
                  )}
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
