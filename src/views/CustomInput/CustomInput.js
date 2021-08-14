import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import Button from '@material-ui/core/Button';

import SelectInput from 'components/SelectInput';
import BaseInput from 'components/BaseInput';

function CustomInput() {
  const { register, handleSubmit, setValue } = useForm();

  const onSubmit = data => console.log(data);

  useEffect(() => {
    setTimeout(() => {
      setValue('baseInput', 113);
      setValue('food', 'vegeatables')
    }, 1000)
  }, [setValue])

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2 style={{ textAlign: 'center' }}>Custom Input with react hook form</h2> 
      <h4>Select Input</h4>
      <SelectInput 
        placeholder="please choose options"
        defaultValue="vegeatables"
        options={[
          {
            label: 'Meat',
            value: 'meat'
          },
          {
            label: 'Rice',
            value: 'rice'
          },
          {
            label: 'Vegeatables',
            value: 'vegeatables'
          }
        ]}
        {...register('food')}
      />

      <h4>Base Input</h4>
      <BaseInput name="baseInput" defaultValue={123} {...register('baseInput')} />

      <br /><br /><br /><br /><br />
      <Button type="submit" color="primary" variant="contained">Submit</Button>
    </form>
  )
}

export default CustomInput
